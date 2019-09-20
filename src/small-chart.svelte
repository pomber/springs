<script>
  import Spring from "./spring.svelte";
  import Border from "./border.svelte";
  import { range } from "./range";
  export let springs;
  export let resolution;
  export let label;
  export let prefix;
  export let maxt = 6;

  const w = 6;
  $: xs = range(0, maxt, 0.5);
  $: scaleT = w / maxt;

  const ys = range(-1, 1, 0.5);
  const dc = 0.03;
</script>

<style>
  svg {
    display: block;
    opacity: 0.8;
    cursor: pointer;
  }

  circle {
    fill: var(--color-01);
  }
  text {
    fill: var(--color-06);
    font-size: 0.4px;
    /* transform: translateX(-30%); */
    text-transform: uppercase;
    text-anchor: end;
  }
  tspan {
    fill: var(--color-03);
  }
</style>

<svg viewBox="-0.25 -1.2 6.5 2.4" width="100%" on:click>
  {#each xs as x}
    {#each ys as y}
      <circle cx={x * scaleT} cy={y} r="0.03" />
    {/each}
  {/each}
  <text alignment="baseline" x="6" y="1.1">
    <tspan>{prefix}</tspan>
    {label}
  </text>
  <Spring {...springs[0]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[1]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[2]} {resolution} {maxt} {scaleT} />
</svg>
