<script lang="ts">
  let isOpen = false

  const toggle = (ev: Event) => {
    isOpen = !isOpen
    ev.stopPropagation();
  };

  const close = (ev: Event) => {
    isOpen = false;
    ev.stopPropagation();
  };

</script>

<div class="dropdown">
  <div on:click={toggle}>
    <i class="fas fa-ellipsis-v" />
  </div>

  {#if isOpen}
    <div class="overlay" on:click={close} />
    <ul class="dropdown-list">
      <slot />
    </ul>
  {/if}
</div>

