<script>
  import { range } from "./range";
  import GitHub from "./github.svelte";

  const w = 1.5;

  const xs = range(-46, 46, 18);
  const ys = range(-225, 225, 18);
  const rects = [];
  xs.forEach(cx => ys.forEach(cy => rects.push({ cx, cy, r: w })));
</script>

<style>
  :root {
    --title-font-size: 44px;
    --title-line-height: 41px;
    --subtitle-font-size: 12px;
  }

  @media only screen and (min-width: 950px) {
    :root {
      --title-font-size: 72px;
      --title-line-height: 63px;
      --subtitle-font-size: 16px;
    }
  }

  h1 {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    margin: 0;
    font-size: var(--title-font-size);
    line-height: var(--title-line-height);

    text-transform: uppercase;
    color: #fafafa55;
    text-align: center;
    justify-self: right;
  }

  h1 span {
    color: #fafafa22;
  }
  p {
    color: var(--color-02);
    text-align: center;
    font-size: var(--subtitle-font-size);
  }

  .container {
    position: relative;
    height: 100%;
  }
  .content {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  .point {
    fill: var(--color-03);
  }
  a {
    text-decoration: none;
    color: currentColor;
  }
  a:hover {
    border-bottom: 1px solid var(--color-02);
  }
</style>

<div class="container">
  <svg viewBox="-50 -50 100 100">
    <!-- <rect x="-15" y="-15" height="30" width="30" /> -->
    {#each rects as rect}
      <circle
        {...rect}
        class="point"
        class:red={Math.random() < 0.5}
        class:blue={Math.random() < 0.4}
        class:green={Math.random() < 0.3}
        style={`opacity: ${Math.random() / 2}`} />
    {/each}
  </svg>
  <div class="content">
    <p>
      <a href="https://github.com/pomber/springs">GitHub Repo</a>
    </p>
    <h1>
      Spring
      <br />
      <span>Editor</span>
    </h1>
    <p>
      by
      <a href="https://twitter.com/pomber">@pomber</a>
    </p>
  </div>

</div>
