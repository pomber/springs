<script>
  const w = 3;
  const b = 4;
  const xs = Array(20)
    .fill(0)
    .map((_, i) => i * (w + b));
  const ys = Array(100)
    .fill(0)
    .map((_, i) => i * (w + b));
  const rects = [];
  xs.forEach(x => ys.forEach(y => rects.push({ x, y, height: w, width: w })));
</script>

<style>
  svg {
    /* background: salmon; */
    /* border: 1px solid blue; */
  }
  .point {
    fill: #fafafa;
    opacity: 0.1;
  }
</style>

<svg viewBox="0 0 100 100" preserveAspectRatio="none">
  <!-- <rect x="10" y="10" height="80" width="80" /> -->
  {#each rects as rect}
    <rect {...rect} class="point" />
  {/each}
</svg>
