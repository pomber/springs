<script>
  import Spring from "./spring.svelte";
  import { getSpring } from "./spring";
  import { range } from "./range";
  import { tweened } from "svelte/motion";
  import SpringAnimation from "./spring-animation.svelte";

  export let springs;
  export let resolution;
  export let x0 = 1;
  export let maxt = 6;

  const w = 7;
  const h = 1;

  $: maxx = Math.max(x0, 1);
  $: ys = range(-maxx, maxx, 0.25);

  $: xs = range(0, maxt, 0.25);
  const dc = 0.03;
  $: scaleX = h / maxx;
  $: scaleT = w / maxt;

  $: viewbox = `${-0.1} ${-h - 0.2} ${w + 0.2} ${2 * h + 0.4}`;

  const hoverT = tweened(0, {
    duration: maxt * 1000
  });

  $: springFns = springs.map(config => getSpring({ ...config, x0, v0: 0 }));
  $: hoverS = springFns.map(fn => fn($hoverT)[0]);

  let element;
  function onMove(e) {
    hoverT
      .set(maxt, { duration: maxt * 1000 })
      .then(() => hoverT.set(0, { duration: 0 }));

    // let pt = element.createSVGPoint();
    // pt.x = e.clientX;
    // pt.y = e.clientY;
    // var cursorpt = pt.matrixTransform(element.getScreenCTM().inverse());
    // $hoverT = cursorpt.x / scaleT;
  }
</script>

<style>
  svg {
    display: block;
  }
  circle {
    fill: #fafafa;
    opacity: 0.1;
  }
  line {
    stroke: #fafafa;
    stroke-width: 0.01;
    opacity: 0.3;
  }
</style>

<svg viewBox={viewbox} width="100%" bind:this={element}>
  {#each xs as x}
    {#each ys as y}
      <circle cx={x * scaleT} cy={y * scaleX} r="0.015" />
    {/each}
  {/each}
  <line x1="0" y1="1.1" x2={maxt * scaleT} y2="1.1" />
  {#each xs as x}
    <line x1={x * scaleT} y1="1.1" x2={x * scaleT} y2="1.05" />
  {/each}
  <line x1="-0.1" y1="-1" x2="-0.1" y2="1" />
  {#each ys as y}
    <line x1="-0.1" y1={y} x2="-0.05" y2={y} />
  {/each}

  <Spring {...springs[0]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[1]} {resolution} {maxt} {scaleT} />
  <Spring {...springs[2]} {resolution} {maxt} {scaleT} />
  <SpringAnimation {maxt} {springs} {scaleT} />
</svg>
