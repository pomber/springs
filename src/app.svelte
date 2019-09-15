<script>
  import BigChart from "./big-chart.svelte";
  import SmallChart from "./small-chart.svelte";
  import Slider from "./slider.svelte";
  import Spring from "./spring.svelte";

  let k1 = 16;
  let c1 = 1;
  let m1 = 1;

  let k2 = 26;
  let c2 = 2;
  let m2 = 2;

  let k3 = 36;
  let c3 = 3;
  let m3 = 3;

  let resolution = 200;

  $: springs = [
    { k: k1, c: c1, m: m1, color: "blue" },
    { k: k2, c: c2, m: m2, color: "red" },
    { k: k3, c: c3, m: m3, color: "green" }
  ];

  const multiplier = 1.5;

  $: lks = springs.map(s => ({ ...s, k: s.k / multiplier }));
  $: lcs = springs.map(s => ({ ...s, c: s.c / multiplier }));
  $: lms = springs.map(s => ({ ...s, m: s.m / multiplier }));
  $: mks = springs.map(s => ({ ...s, k: s.k * multiplier }));
  $: mcs = springs.map(s => ({ ...s, c: s.c * multiplier }));
  $: mms = springs.map(s => ({ ...s, m: s.m * multiplier }));
</script>

<style>
  h1 {
    text-align: center;
  }
  header,
  footer {
    flex: 1;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    max-width: 1200px;
  }
  .center {
    grid-area: 2 / 2 / 5 / 5;
    /* border: 1px solid green; */
  }
  .right {
    grid-area: 1 / 5 / 6 / 6;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .left {
    grid-area: 1 / 1 / 6 / 2;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .top1 {
    grid-area: 1 / 2 / 2 / 3;
  }
  .top2 {
    grid-area: 1 / 3 / 2 / 4;
  }
  .top3 {
    grid-area: 1 / 4 / 2 / 5;
  }
  .bottom1 {
    grid-area: 5 / 2 / 6 / 3;
  }
  .bottom2 {
    grid-area: 5 / 3 / 6 / 4;
  }
  .bottom3 {
    grid-area: 5 / 4 / 6 / 5;
  }
</style>

<header>
  <h1>Springs</h1>
</header>
<div class="grid">
  <div class="center">
    <BigChart {springs} {resolution} />
  </div>
  <div class="right">
    Stiffness
    <Slider bind:value={k1} />
    <Slider bind:value={k2} />
    <Slider bind:value={k3} />
    Damping Ratio
    <Slider bind:value={c1} />
    <Slider bind:value={c2} />
    <Slider bind:value={c3} />
    Mass
    <Slider bind:value={m1} />
    <Slider bind:value={m2} />
    <Slider bind:value={m3} />
  </div>
  <div class="left">
    Resolution
    <Slider min={10} max={2000} bind:value={resolution} />
  </div>
  <div class="top1">
    <SmallChart springs={lks} {resolution} />
  </div>
  <div class="top2">
    <SmallChart springs={lcs} {resolution} />
  </div>
  <div class="top3">
    <SmallChart springs={lms} {resolution} />
  </div>
  <div class="bottom1">
    <SmallChart springs={mks} {resolution} />
  </div>
  <div class="bottom2">
    <SmallChart springs={mcs} {resolution} />
  </div>
  <div class="bottom3">
    <SmallChart springs={mms} {resolution} />
  </div>
</div>
<footer />
