<script>
  import Spring from "./spring.svelte";
  import { range } from "./range";
  export let springs;
  export let resolution;
  export let x0 = 1;
  export let maxt = 6;

  const w = 7;
  const h = 1;

  $: maxx = Math.max(x0, 1);
  $: ys = range(-maxx, maxx, 0.25);

  $: xs = range(0, maxt, 0.25);
  const dc = 0.03;
  $: scaleX = h / maxx;
  $: scaleT = w / maxt;

  $: viewbox = `${-0.1} ${-h - 0.2} ${w + 0.2} ${2 * h + 0.4}`;
</script>

<style>
  svg {
    display: block;
  }
  circle {
    fill: #fafafa;
    opacity: 0.1;
  }
</style>

<svg viewBox={viewbox} width="100%">
  {#each xs as x}
    {#each ys as y}
      <circle cx={x * scaleT} cy={y * scaleX} r="0.015" />
    {/each}
  {/each}
  <Spring {...springs[0]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[1]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[2]} {resolution} {maxt} {scaleT} />
</svg>
