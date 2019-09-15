<script>
  export let min = 0;
  export let max = 100;
  export let log = false;
  export let value = 1;

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
    });

    element.noUiSlider.on("update", function() {
      value = +element.noUiSlider.get();
    });
  });
</script>

<style>
  .container {
    width: 100%;
    display: flex;
  }
  .slider {
    flex: 1;
  }
  span {
    width: 30px;
    text-align: center;
  }
</style>

<div class="container">
  <div class="slider" bind:this={element} />
  <span>{value}</span>
</div>
