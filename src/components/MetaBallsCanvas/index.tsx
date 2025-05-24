/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
import React, { useRef, useEffect } from 'react';

function MetaBallsCanvas(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const { width, height } = canvas;
    const context = canvas.getContext('webgl');
    let animationFrameId: number;

    const draw = (gl: WebGLRenderingContext) => {
      const numMetaballs = 100;
      const speed = 1.4;
      const metaballs: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
      }[] = [];

      for (let i = 0; i < numMetaballs; i++) {
        const radius = Math.random() * 300 * (window.innerWidth > 1600 ? 2 : 1);
        metaballs.push({
          x: Math.random() * (width - 2 * radius) + radius,
          y: Math.random() * (height - 2 * radius) + radius,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: radius * 0.09,
        });
      }

      const vertexShaderSrc = `
        attribute vec2 position;

        void main() {
        // position specifies only x and y.
        // We set z to be 0.0, and w to be 1.0
        gl_Position = vec4(position, 0.0, 1.0);
        }
        `;

      const fragmentShaderSrc = `precision highp float;

        const float WIDTH = ${width >> 0}.0;
        const float HEIGHT = ${height >> 0}.0;

        uniform vec3 metaballs[${numMetaballs}];

        void main() {
          float x = gl_FragCoord.x;
          float y = gl_FragCoord.y;

          float sum = 0.0;
          for (int i = 0; i < ${numMetaballs}; i++) {
          vec3 metaball = metaballs[i];
          float dx = metaball.x - x;
          float dy = metaball.y - y;
          float radius = metaball.z;

          sum += (radius * radius) / (dx * dx + dy * dy);
        }

        if (sum >= 0.99) {
        gl_FragColor = vec4(mix(vec3(x / WIDTH, y / HEIGHT, 0.8), vec3(0, 0, 0), max(0.0, 1.0 - (sum - 0.99) * 100.0)), 1.0);
        return;
        }

        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }`;

      const vertexShader = compileShader(
        vertexShaderSrc,
        gl.VERTEX_SHADER
      ) as WebGLShader;
      const fragmentShader = compileShader(
        fragmentShaderSrc,
        gl.FRAGMENT_SHADER
      ) as WebGLShader;

      const program = gl.createProgram() as WebGLProgram;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      const vertexData = new Float32Array([
        -1.0,
        1.0, // top left
        -1.0,
        -1.0, // bottom left
        1.0,
        1.0, // top right
        1.0,
        -1.0, // bottom right
      ]);
      const vertexDataBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

      const positionHandle = getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(positionHandle);
      gl.vertexAttribPointer(
        positionHandle,
        2, // position is a vec2
        gl.FLOAT, // each component is a float
        false, // don't normalize values
        2 * 4, // two 4 byte float components per vertex
        0 // offset into each span of vertex data
      );

      const metaballsHandle = getUniformLocation(program, 'metaballs');

      function loop() {
        for (let i = 0; i < numMetaballs; i++) {
          const metaball = metaballs[i];
          metaball.x += metaball.vx;
          metaball.y += metaball.vy;

          if (metaball.x < metaball.r || metaball.x > width - metaball.r) {
            metaball.vx *= -1;
          }
          if (metaball.y < metaball.r || metaball.y > height - metaball.r) {
            metaball.vy *= -1;
          }
        }

        const dataToSendToGPU = new Float32Array(3 * numMetaballs);
        for (let i = 0; i < numMetaballs; i++) {
          const baseIndex = 3 * i;
          const mb = metaballs[i];
          dataToSendToGPU[baseIndex + 0] = mb.x;
          dataToSendToGPU[baseIndex + 1] = mb.y;
          dataToSendToGPU[baseIndex + 2] = mb.r;
        }
        gl.useProgram(program);
        gl.uniform3fv(metaballsHandle, dataToSendToGPU);

        // Draw
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

        animationFrameId = requestAnimationFrame(loop);
      }

      loop();

      function compileShader(shaderSource: string, shaderType: GLenum) {
        const shader = gl.createShader(shaderType) as WebGLShader;
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(
            `Shader compile failed with: ${gl.getShaderInfoLog(shader)}`
          );
        }

        return shader;
      }

      function getUniformLocation(currentProgram: WebGLProgram, name: string) {
        const uniformLocation = gl.getUniformLocation(currentProgram, name);
        if (uniformLocation === -1) {
          throw new Error(`Can not find uniform ${name}.`);
        }
        return uniformLocation;
      }

      function getAttribLocation(currentProgram: WebGLProgram, name: string) {
        const attributeLocation = gl.getAttribLocation(currentProgram, name);
        if (attributeLocation === -1) {
          throw new Error(`Can not find attribute ${name}.`);
        }
        return attributeLocation;
      }
    };

    if (context) {
      draw(context);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}

export default MetaBallsCanvas;
