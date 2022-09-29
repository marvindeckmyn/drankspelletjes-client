<script lang="ts">
  export let onClick: any;
  export let className = "";

</script>

<div class={`btn ${className}`} on:click={onClick}>
  <i class="fa-solid fa-trash-can"></i>
</div>
