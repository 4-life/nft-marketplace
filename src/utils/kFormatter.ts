export default function kFormatter(num: number): string {
  if (Math.abs(num) > 999) {
    return `${((Math.sign(num) * Math.abs(num)) / 1000).toFixed(1)}k`;
  }

  return `${Math.sign(num) * Math.abs(num)}`;
}
