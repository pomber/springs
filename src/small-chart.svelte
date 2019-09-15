<script>
  import Spring from "./spring.svelte";
  import Border from "./border.svelte";
  import { range } from "./range";
  export let springs;
  export let resolution;
  export let label;
  export let x0;
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
    padding: 0 2px;
  }

  circle {
    fill: #fafafa;
    opacity: 0.07;
  }
  text {
    fill: #fafafa;
    opacity: 0.25;
    font-size: 0.5px;
    transform: translateX(-30%);
    text-transform: uppercase;
  }
</style>

<svg viewBox="-0.2 -1.2 6.4 2.4" width="100%">
  {#each xs as x}
    {#each ys as y}
      <circle cx={x * scaleT} cy={y} r="0.03" />
    {/each}
  {/each}
  <text alignment-baseline="" x="5.2" y="1.1">{label}</text>
  <Spring {...springs[0]} {resolution} {x0} {maxt} {scaleT} />
  <Spring {...springs[1]} {resolution} {x0} {maxt} {scaleT} />
  <Spring {...springs[2]} {resolution} {x0} {maxt} {scaleT} />
</svg>
