<script>
  import BigChart from "./big-chart.svelte";
  import SmallChart from "./small-chart.svelte";
  import Slider from "./slider.svelte";
  import Spring from "./spring.svelte";
  import Header from "./header.svelte";

  let k1 = 1;
  let c1 = 1;
  let m1 = 1;

  let k2 = 40;
  let c2 = 1;
  let m2 = 3;

  let k3 = 64;
  let c3 = 12;
  let m3 = 0.5;

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
  :root {
    --left-col-width: 82px;
    --right-col-width: 110px;
    --hide-mobile-display: none;
  }

  @media only screen and (min-width: 950px) {
    :root {
      --left-col-width: 126px;
      --right-col-width: 160px;
      --hide-mobile-display: block;
    }
  }

  .hide-mobile {
    display: var(--hide-mobile-display);
  }
  .grid {
    display: grid;
    grid-template-columns: var(--left-col-width) repeat(3, 1fr) var(
        --right-col-width
      );
    grid-template-rows: 0.666fr repeat(2, 1fr) 0.666fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    max-width: 1200px;
    min-width: 710px;
    /* justify-items: center; */
  }
  .center {
    grid-area: 2 / 2 / 4 / 5;
    min-width: 498px;
  }
  .right-panel {
    grid-area: 1 / 5 / 5 / 6;
    /* padding: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* background: salmon; */
  }
  .spring-controls {
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
  }
</style>

<main>
  <div class="grid">

    <div class="center">
      <BigChart {springs} {resolution} {maxt} />
    </div>

    <div class="right-panel">
      <div class="spring-controls hide-mobile">
        <Slider range={{ min: 1, max: 10 }} bind:value={maxt} label="seconds" />
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
      <div class="spring-controls hide-mobile">
        <Slider
          range={{ min: 10, max: 1200 }}
          step={1}
          bind:value={resolution}
          label="dots per spring" />
      </div>
    </div>

    <div style="grid-area: 1 / 1 / 5 / 2">
      <Header />
    </div>

    <div style="grid-area: 1 / 2 / 2 / 3">
      <SmallChart
        springs={lks}
        {resolution}
        {maxt}
        prefix="less"
        label="stiffness"
        on:click={e => (springs = lks)} />

    </div>
    <div style="grid-area: 1 / 3 / 2 / 4">
      <SmallChart
        springs={lcs}
        {resolution}
        {maxt}
        prefix="less"
        label="damping"
        on:click={e => (springs = lcs)} />
    </div>
    <div style="grid-area: 1 / 4 / 2 / 5">
      <SmallChart
        springs={lms}
        {resolution}
        {maxt}
        prefix="less"
        label="mass"
        on:click={e => (springs = lms)} />
    </div>
    <div style="grid-area: 4 / 2 / 5 / 3">
      <SmallChart
        springs={mks}
        {resolution}
        {maxt}
        prefix="more"
        label="stiffness"
        on:click={e => (springs = mks)} />
    </div>
    <div style="grid-area: 4 / 3 / 5 / 4">
      <SmallChart
        springs={mcs}
        {resolution}
        {maxt}
        prefix="more"
        label="damping"
        on:click={e => (springs = mcs)} />
    </div>
    <div style="grid-area: 4 / 4 / 5 / 5">
      <SmallChart
        springs={mms}
        {resolution}
        {maxt}
        prefix="more"
        label="mass"
        on:click={e => (springs = mms)} />
    </div>

  </div>
</main>
