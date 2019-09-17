<script>
  import { tweened } from "svelte/motion";
  import { getSpring } from "./spring";

  export let springs;
  export let maxt;
  export let scaleT;

  let isRunning = false;

  const t = tweened(0);

  $: springFns = springs.map(config => getSpring({ ...config, x0: 1, v0: 0 }));
  $: results = springFns.map(fn => fn($t)[0]);

  function run() {
    isRunning = true;
    t.set(maxt, { duration: maxt * 1000 }).then(() => {
      t.set(0, { duration: 0 });
      isRunning = false;
    });
  }

  function pause() {
    isRunning = false;
  }
</script>

<style>
  polygon,
  rect {
    fill: #fafafa66;
  }
  text {
    fill: #fafafa66;
    font-size: 20px;
  }

  rect.h {
    fill: none;
    stroke: aquamarine;
  }
  .blue {
    stroke-width: 0.02;
    opacity: 0.15;
    stroke: #27eed4;
  }
  .red {
    stroke-width: 0.02;
    opacity: 0.15;
    stroke: #f1993a;
  }
  .green {
    stroke-width: 0.02;
    opacity: 0.15;
    stroke: #87c33d;
  }
  polygon {
    fill: #fafafa;
    opacity: 0.5;
  }

  circle.blue,
  circle.red,
  circle.green {
    opacity: 0.6;
  }
</style>

<svg
  x="6.2"
  y="-1"
  viewBox="0 0 100 200"
  width="0.5"
  preserveAspectRatio="xMidYMin">
  <!-- <rect x="0" y="0" width="100" height="200" class="h" /> -->
  {#if isRunning}
    <g on:click={pause}>
      <rect x="10" y="10" width="15" height="40" />
      <rect x="30" y="10" width="15" height="40" />
    </g>
    <text x="10" y="80">t: {$t}</text>
    <text x="10" y="100">{results[0]}</text>
    <text x="10" y="120">{results[1]}</text>
    <text x="10" y="140">{results[2]}</text>
  {:else}
    <g on:click={run}>
      <polygon stroke-miterlimit="10" points="10,10 40,30 10,50" />
    </g>
  {/if}
  <g>
    <rect x="55" y="10" width="40" height="40" />
  </g>

</svg>

{#if isRunning}
  <polygon
    points={`${$t * scaleT},1 ${$t * scaleT - 0.05},1.1 ${$t * scaleT + 0.05},1.1`} />
  {#each results as y, i}
    <line x1="-0.1" y1={y} x2={maxt * scaleT} y2={y} class={springs[i].color} />
    <circle cx={$t * scaleT} cy={y} r={0.03} class={springs[i].color} />
  {/each}
{/if}
