<script>
  import { range } from "./range";
  import Spring from "./spring.svelte";
  import SpringAnimation from "./spring-animation.svelte";

  export let springs;
  export let resolution;
  export let x0 = 1;
  export let maxt = 6;

  const w = 7;
  const h = 1;

  $: maxx = Math.max(x0, 1);
  $: ys = range(-maxx, maxx, 0.25);
  $: xs = range(0, maxt, 0.25);
  $: scaleX = h / maxx;
  $: scaleT = w / maxt;
  $: viewbox = `${-0.1} ${-h - 0.2} ${w + 0.2} ${2 * h + 0.4}`;
</script>

<style>
  svg {
    display: block;
  }
  circle {
    fill: var(--color-01);
  }
  line {
    stroke: var(--color-02);
    stroke-width: 0.01;
  }
  text {
    text-anchor: end;
    fill: var(--color-03);
    text-transform: uppercase;
    font-size: 0.1px;
  }
</style>

<svg viewBox={viewbox} width="100%">
  {#each xs as x}
    {#each ys as y}
      <circle cx={x * scaleT} cy={y * scaleX} r="0.015" />
    {/each}
  {/each}
  <line x1="0" y1="1.1" x2={w} y2="1.1" />
  <text x={w} y="1.1" dx="-0.02" dy="-0.02">Seconds</text>

  {#each xs as x}
    {#if Number.isInteger(x)}
      <line x1={x * scaleT} y1="1.1" x2={x * scaleT} y2="1.05" />
    {/if}
  {/each}
  <line x1={w + 0.1} y1="-1" x2={w + 0.1} y2="1" />

  {#each ys as y}
    {#if Number.isInteger(y)}
      <line x1={w + 0.1} y1={y} x2={w + 0.05} y2={y} />
    {/if}
  {/each}

  <Spring {...springs[0]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[1]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[2]} {resolution} {maxt} {scaleT} />
  <SpringAnimation {maxt} {springs} {scaleT} />
</svg>
