<script>
  import { onMount, afterUpdate } from "svelte";
  import noUiSlider from "nouislider";

  export let min = 0;
  export let max = 100;
  export let log = false;
  export let value = 1;
  export let label = "";
  export let step = 0;
  export let range = {
    min: 0,
    "33%": 1,
    "41%": 2,
    "50%": 4,
    "58%": 8,
    "66%": 16,
    "75%": 32,
    "83%": 64,
    "92%": 128,
    max: 256
  };

  let element;

  onMount(() => {
    noUiSlider.create(element, {
      start: value,
      connect: [true, false],
      step,
      range
    });

    element.noUiSlider.on("update", function() {
      value = +element.noUiSlider.get();
    });
  });

  afterUpdate(() => {
    element.noUiSlider.set(value);
  });
</script>

<style>
  label {
    text-transform: uppercase;
    flex: 1;
    color: rgba(250, 250, 250, 0.4);
  }
  .content {
    width: 100%;
    font-size: 11px;
    display: flex;
  }
  @media only screen and (min-width: 950px) {
    .content {
      font-size: 12px;
    }
  }
  .slider {
    margin-top: 5px;
  }
  .container {
    margin: 5px 0;
  }
  span {
    text-align: right;
    font-variant-numeric: tabular-nums;
    user-select: text;
    color: rgba(250, 250, 250, 0.5);
  }
</style>

<div class="container">
  <div class="content">
    <label>{label}</label>
    <span>{step === 1 ? value : value.toFixed(2)}</span>
  </div>
  <div class="slider" bind:this={element} />
</div>
