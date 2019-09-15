<script>
  import Spring from "./spring.svelte";
  import { range } from "./range";
  export let springs;
  export let resolution;
  const xs = range(0, 8, 0.25);
  const ys = range(-1, 1, 0.25);
  const dc = 0.03;
</script>

<style>
  svg {
    display: block;
    border-radius: 10px;
  }
  circle {
    fill: #fafafa;
    opacity: 0.1;
  }
</style>

<svg viewBox="-0.2 -1.2 6.4 2.4" width="100%">
  {#each xs as x}
    {#each ys as y}
      <circle cx={x} cy={y} r="0.015" />
    {/each}
  {/each}
  <Spring {...springs[0]} {resolution} />
  <Spring {...springs[1]} {resolution} />
  <Spring {...springs[2]} {resolution} />
</svg>
