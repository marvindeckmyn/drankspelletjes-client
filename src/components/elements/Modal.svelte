<script lang="ts">
  export let id: string;

  import { modalStore } from '../../stores/';

  let active = false;

  const changeState = (state: boolean) => {
    active = state
  };

  modalStore.register(id, changeState);
</script>

{#if active}
  <div class="modal-overlay" />
  <div id={id} class="modal">
      <slot />
  </div>
{/if}


<style>
  @import '../../assets/scss/modal.scss';
</style>
