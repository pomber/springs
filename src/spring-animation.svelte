<script>
  import { tweened } from "svelte/motion";
  import { onMount, onDestroy } from "svelte";
  import { getSpring } from "./spring";

  export let springs;
  export let maxt;
  export let scaleT;

  let isRunning = false;

  const t = tweened(0);

  $: show = $t !== 0;
  $: springFns = springs.map(config => getSpring({ ...config, x0: 1, v0: 0 }));
  $: results = springFns.map(fn => fn($t)[0]);

  function toggle(event) {
    if (event.code !== "Space") return;
    if (isRunning) {
      t.set($t, { duration: 0 });
      isRunning = false;
    } else {
      isRunning = true;
      t.set(maxt, { duration: (maxt - $t) * 1000 }).then(() => {
        t.set(0, { duration: 0 });
        isRunning = false;
      });
    }
  }

  const toString = x =>
    x.toLocaleString("fullwide", {
      useGrouping: false,
      maximumFractionDigits: 8
    });

  onMount(() => {
    console.log(
      "%c%s",
      "color: #27eed488; background: black; font-size: 24px;",
      "Hey! press the spacebar to animate"
    );
    document.addEventListener("keyup", toggle);
  });

  onDestroy(() => {
    document.removeEventListener("keyup", toggle);
  });
</script>

<style>
  polygon {
    fill: #fafafa66;
  }
  text {
    fill: #fafafa;
    font-size: 20px;
    opacity: 0.4 !important;
  }

  .blue {
    stroke-width: 0.02;
    opacity: 0.15;
    stroke: #27eed4;
    fill: #27eed4;
  }
  .red {
    stroke-width: 0.02;
    opacity: 0.15;
    stroke: #f1993a;
    fill: #f1993a;
  }
  .green {
    stroke-width: 0.02;
    opacity: 0.15;
    fill: #87c33d;
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
  x="6.5"
  y="-1.1"
  viewBox="0 0 100 200"
  width="0.5"
  preserveAspectRatio="xMidYMin">
  {#if show}
    <text x="10" y="30">t: {toString($t)}</text>
    <text x="10" y="60" class={springs[0].color}>{toString(results[0])}</text>
    <text x="10" y="90" class={springs[1].color}>{toString(results[1])}</text>
    <text x="10" y="120" class={springs[2].color}>{toString(results[2])}</text>
  {/if}

</svg>

{#if show}
  <polygon
    points={`${$t * scaleT},1 ${$t * scaleT - 0.05},1.1 ${$t * scaleT + 0.05},1.1`} />
  {#each results as y, i}
    <line x1="-0.1" y1={y} x2={maxt * scaleT} y2={y} class={springs[i].color} />
    <circle cx={$t * scaleT} cy={y} r={0.03} class={springs[i].color} />
  {/each}
{/if}
