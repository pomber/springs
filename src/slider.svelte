<script>
  export let min = 0;
  export let max = 100;
  export let log = false;
  export let value = 1;
</script>

<style>
  div {
    width: 100%;
    display: flex;
  }
  input {
    flex: 1;
  }
  span {
    width: 30px;
    text-align: center;
  }
</style>

<div>
  <input type="range" bind:value {min} {max} />
  <span>{value}</span>
</div>
