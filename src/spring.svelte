<script>
  import { newSpring } from "./spring";

  export let k = 65;
  export let c = 13;
  export let m = 2;
  export let color = "red";
  export let resolution;
  export let x0 = 1;
  export let scaleX = 1;
  export let maxt = 6;
  export let scaleT = 1;

  $: ts = Array(resolution + 1)
    .fill(0)
    .map((_, i) => (maxt * 1000 * i) / resolution);

  const target = 0;
  const v0 = 0;
  const start = 0;

  $: spring = newSpring(target, x0, v0, start, k, c, m);
  $: points = ts.map(t => [(scaleT * t) / 1000, spring(t)[0] * scaleX]);
</script>

<style>
  circle {
    opacity: 0.4;
  }
  .blue {
    fill: #27eed4;
  }
  .red {
    fill: #f1993a;
  }
  .green {
    fill: #87c33d;
  }
</style>

<g class={color}>
  {#each points as point}
    <circle cx={point[0]} cy={point[1]} r="0.015" />
  {/each}
</g>
