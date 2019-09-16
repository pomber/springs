<script>

</script>

<style>
  .corners {
    position: relative;
    width: 100%; /* for demo purposes */
  }

  .top,
  .bottom {
    position: absolute;
    width: 5px;
    height: 5px;
  }

  .top {
    top: 0;
    border-top: 1.5px solid #fafafa40;
  }

  .bottom {
    bottom: 0;
    border-bottom: 1.5px solid #fafafa40;
  }

  .left {
    left: 0;
    border-left: 1.5px solid #fafafa40;
  }

  .right {
    right: 0;
    border-right: 1.5px solid #fafafa40;
  }
</style>

<div class="corners">
  <div class="top left" />
  <div class="top right" />
  <div class="bottom right" />
  <div class="bottom left" />
  <slot />
</div>
