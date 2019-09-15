const { round, sqrt, exp, sin, cos, pow } = Math;

export function newSpring(target, x0, v0, start, k, c, m) {
  const d = target - x0;
  const spring = getSpring({ k, c, m, x0: d, v0 });
  return now => {
    const t = (now - start) / 1000;
    const [x, v] = spring(t);
    return [target - x, v];
  };
}

function getSpring({ k, c, m, x0, v0 }) {
  const radicand = c * c - 4 * k * m;
  if (radicand > 0) {
    const rp = (-c + sqrt(radicand)) / (2 * m);
    const rn = (-c - sqrt(radicand)) / (2 * m);
    const a = (x0 * rp - v0) / (rp - rn);
    const b = (v0 - x0 * rn) / (rp - rn);
    return t => [
      a * exp(rn * t) + b * exp(rp * t),
      a * rn * exp(rn * t) + b * rp * exp(rp * t)
    ];
  } else if (radicand < 0) {
    const r = -c / (2 * m);
    const s = sqrt(-radicand) / (2 * m);
    const a = x0;
    const b = (v0 - r * x0) / s;
    return t => [
      exp(r * t) * (a * cos(s * t) + b * sin(s * t)),
      exp(r * t) * ((b * s + a * r) * cos(s * t) - (a * s - b * r) * sin(s * t))
    ];
  } else {
    const r = -c / (2 * m);
    const a = x0;
    const b = v0 - r * x0;
    return t => [
      (a + b * t) * exp(r * t),
      (b + a * r + b * r * t) * exp(r * t)
    ];
  }
}

function roundTo(x, decimals) {
  const p = pow(10, decimals);
  return round(x * p) / p;
}
