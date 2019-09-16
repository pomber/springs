<script>
  import BigChart from "./big-chart.svelte";
  import SmallChart from "./small-chart.svelte";
  import GitHub from "./github.svelte";
  import Slider from "./slider.svelte";
  import Spring from "./spring.svelte";

  let k1 = 16;
  let c1 = 20;
  let m1 = 15;

  let k2 = 26;
  let c2 = 22;
  let m2 = 20;

  let k3 = 36;
  let c3 = 31;
  let m3 = 33;

  let resolution = 250;
  let x0 = 1;
  let maxt = 6;

  $: springs = [
    { k: k1, c: c1, m: m1, color: "blue" },
    { k: k2, c: c2, m: m2, color: "red" },
    { k: k3, c: c3, m: m3, color: "green" }
  ];

  const multiplier = 2;

  $: lks = springs.map(s => ({ ...s, k: s.k / multiplier }));
  $: lcs = springs.map(s => ({ ...s, c: s.c / multiplier }));
  $: lms = springs.map(s => ({ ...s, m: s.m / multiplier }));
  $: mks = springs.map(s => ({ ...s, k: s.k * multiplier }));
  $: mcs = springs.map(s => ({ ...s, c: s.c * multiplier }));
  $: mms = springs.map(s => ({ ...s, m: s.m * multiplier }));
</script>

<style>
  h1 {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    margin: 0;
    font-size: 72px;
    text-transform: uppercase;
    color: #fafafa55;
    line-height: 63px;
    text-align: center;
    justify-self: right;
  }
  h1 span {
    color: #fafafa22;
  }
  p {
    color: #fafafa55;
    text-align: center;
    /* text-transform: uppercase; */
    font-size: 14px;
  }
  header,
  footer {
    flex: 1;
  }
  .grid {
    display: grid;
    grid-template-columns: 170px repeat(3, 1fr) 170px;
    grid-template-rows: 0.666fr repeat(2, 1fr) 0.666fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    max-width: 1200px;
    /* justify-items: center; */
  }
  .center {
    grid-area: 2 / 2 / 4 / 5;
  }
  .right-panel {
    grid-area: 1 / 5 / 5 / 6;
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .left-panel {
    grid-area: 2 / 1 / 4 / 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  .left-bottom {
    grid-area: 4 / 1 / 5 / 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    align-self: start;
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
    grid-area: 4 / 2 / 5 / 3;
  }
  .bottom2 {
    grid-area: 4 / 3 / 5 / 4;
  }
  .bottom3 {
    grid-area: 4 / 4 / 5 / 5;
  }
  .spring-controls {
    padding: 0 10px;
    width: 150px;
  }
</style>

<header />
<div class="grid">
  <div class="center">
    <BigChart {springs} {resolution} {maxt} />
  </div>
  <div class="right-panel">
    <div class="spring-controls">
      <Slider min={1} max={10} bind:value={maxt} label="max T" />
    </div>
    <div class="spring-controls blue">
      <Slider bind:value={k1} label="Stiffness" />
      <Slider bind:value={c1} label="Damping" />
      <Slider bind:value={m1} label="Mass" />
    </div>
    <div class="spring-controls red">
      <Slider bind:value={k2} label="Stiffness" />
      <Slider bind:value={c2} label="Damping" />
      <Slider bind:value={m2} label="Mass" />
    </div>
    <div class="spring-controls green">
      <Slider bind:value={k3} label="Stiffness" />
      <Slider bind:value={c3} label="Damping" />
      <Slider bind:value={m3} label="Mass" />
    </div>
    <div class="spring-controls">
      <Slider
        min={10}
        max={2000}
        bind:value={resolution}
        label="dots per spring" />
    </div>
  </div>
  <div class="left-panel">

    <div>
      <h1>
        Spring
        <br />
        <span>Editor</span>
      </h1>
    </div>

  </div>
  <div class="left-bottom">
    <GitHub />
    <p>by @pomber</p>

  </div>
  <div class="top1">
    <SmallChart springs={lks} {resolution} {maxt} label="- stiffness" />
  </div>
  <div class="top2">
    <SmallChart springs={lcs} {resolution} {maxt} label="- damping" />
  </div>
  <div class="top3">
    <SmallChart springs={lms} {resolution} {maxt} label="- mass" />
  </div>
  <div class="bottom1">
    <SmallChart springs={mks} {resolution} {maxt} label="+ stiffness" />
  </div>
  <div class="bottom2">
    <SmallChart springs={mcs} {resolution} {maxt} label="+ damping" />
  </div>
  <div class="bottom3">
    <SmallChart springs={mms} {resolution} {maxt} label="+ mass" />
  </div>
</div>
<footer />
