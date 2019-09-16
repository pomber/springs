<script>
  export let min = 0;
  export let max = 100;
  export let log = false;
  export let value = 1;
  export let label = "";

  import { onMount } from "svelte";
  import noUiSlider from "nouislider";

  let element;

  onMount(() => {
    noUiSlider.create(element, {
      start: value,
      connect: [true, false],
      step: 1,
      range: {
        min,
        max
      }
      // padding: [Math.ceil(0.15 * (max - min)), 0]
    });

    element.noUiSlider.on("update", function() {
      value = +element.noUiSlider.get();
    });
  });
</script>

<style>
  label {
    text-transform: uppercase;
    color: rgba(250, 250, 250, 0.6);
    font-size: 12px;
    flex: 1;
  }
  .content {
    width: 100%;
    display: flex;
  }
  .slider {
    margin-top: 5px;
  }
  .container {
    margin: 5px 0;
  }
  span {
    width: 30px;
    text-align: center;
    color: rgba(250, 250, 250, 0.6);
    font-size: 12px;
  }
</style>

<div class="container">
  <div class="content">
    <label>{label}</label>
    <span>{value}</span>
  </div>
  <div class="slider" bind:this={element} />
</div>
