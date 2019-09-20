<script>
  import { newSpring } from "./spring";

  export let k = 65;
  export let c = 13;
  export let m = 2;
  export let color = "red";
  export let resolution;
  export let maxt = 6;
  export let scaleT = 1;

  const x0 = 1;
  $: ts = Array(resolution + 1)
    .fill(0)
    .map((_, i) => (maxt * 1000 * i) / resolution);

  const target = 0;
  const v0 = 0;
  const start = 0;

  $: spring = newSpring(target, x0, v0, start, k, c, m);
  $: points = ts.map(t => [(scaleT * t) / 1000, spring(t)[0]]);
</script>

<style>
  circle {
    fill: var(--color-06);
  }
</style>

<g class={color}>
  {#each points as point}
    <circle cx={point[0]} cy={point[1]} r="0.015" />
  {/each}
</g>
