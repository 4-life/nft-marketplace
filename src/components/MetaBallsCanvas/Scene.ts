import { Renderer, Program, Mesh, Triangle, Vec2 } from 'ogl';
import vertex from './main.vert?raw';
import fragment from './main.frag?raw';

const SPEED = 0.8;

interface Metaball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  br: number; // bounce margin — full spawn radius keeps visual blob inside canvas
}

class Scene {
  #renderer!: Renderer;

  #mesh!: Mesh;

  #program!: Program;

  #canvasEl: HTMLCanvasElement;

  #metaballs: Metaball[] = [];

  #width: number;

  #height: number;

  #animationId: number = 0;

  #destroyed = false;

  #introStart = performance.now();

  readonly #introDuration = 5000;

  readonly #numMetaballs: number;

  // Pre-allocated buffer — mutated in place each frame
  #metaballsData: Float32Array;

  constructor(
    canvasEl: HTMLCanvasElement,
    width: number,
    height: number,
    numMetaballs: number,
  ) {
    this.#canvasEl = canvasEl;
    this.#width = width;
    this.#height = height;
    this.#numMetaballs = numMetaballs;
    this.#metaballsData = new Float32Array(3 * numMetaballs);
    this.setScene();
  }

  resize(width: number, height: number) {
    this.#width = width;
    this.#height = height;
    this.#renderer.setSize(width, height);
    this.#program.uniforms.uResolution.value.set(width, height);
  }

  setScene() {
    this.#renderer = new Renderer({
      dpr: 1,
      canvas: this.#canvasEl,
      width: this.#width,
      height: this.#height,
      alpha: true,
    });

    this.#renderer.gl.clearColor(0, 0, 0, 0);

    const { gl } = this.#renderer;

    for (let i = 0; i < this.#numMetaballs; i += 1) {
      const radius = Math.random() * 100;
      this.#metaballs.push({
        x: Math.random() * (this.#width - 2 * radius) + radius,
        y: Math.random() * (this.#height - 2 * radius) + radius,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: radius * 0.4,
        br: radius,
      });
    }

    const geometry = new Triangle(gl);

    // OGL parses "uMetaballs[0]" as uniformName="uMetaballs", nameComponents=["0"].
    // It then traverses: uniforms["uMetaballs"]["0"].value
    // so the correct shape is { 0: { value: Float32Array } }.
    this.#program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uResolution: { value: new Vec2(this.#width, this.#height) },
        uMetaballs: { 0: { value: this.#metaballsData } },
      },
    });

    this.#mesh = new Mesh(gl, { geometry, program: this.#program });

    this.#animationId = requestAnimationFrame(this.handleRAF);
  }

  handleRAF = () => {
    if (this.#destroyed) return;
    this.#animationId = requestAnimationFrame(this.handleRAF);

    for (const mb of this.#metaballs) {
      mb.x += mb.vx;
      mb.y += mb.vy;

      if (mb.x < mb.br) {
        mb.x = mb.br;
        mb.vx = Math.abs(mb.vx);
      } else if (mb.x > this.#width - mb.br) {
        mb.x = this.#width - mb.br;
        mb.vx = -Math.abs(mb.vx);
      }

      if (mb.y < mb.br) {
        mb.y = mb.br;
        mb.vy = Math.abs(mb.vy);
      } else if (mb.y > this.#height - mb.br) {
        mb.y = this.#height - mb.br;
        mb.vy = -Math.abs(mb.vy);
      }
    }

    const t = Math.min(
      (performance.now() - this.#introStart) / this.#introDuration,
      1,
    );
    const ease = t < 1 ? 1 - (1 - t) ** 3 : 1;
    const visible = Math.max(1, Math.round(ease * this.#numMetaballs));

    for (let i = 0; i < this.#numMetaballs; i += 1) {
      const mb = this.#metaballs[i];
      this.#metaballsData[i * 3] = mb.x;
      this.#metaballsData[i * 3 + 1] = mb.y;
      this.#metaballsData[i * 3 + 2] = i < visible ? mb.r : 0;
    }

    this.#renderer.render({ scene: this.#mesh });
  };

  destroy() {
    this.#destroyed = true;
    cancelAnimationFrame(this.#animationId);
  }
}

export default Scene;
