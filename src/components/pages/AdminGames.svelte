<script lang="ts">
  import { onMount } from 'svelte';
  import type { Game } from '../models';
  import { categoryStore, gameStore } from '../../stores';

  export let id = '';
  let dragSrcEl;
  let dragSrcGame: Game;

  const getCategoryByID = () => {
    try {
      categoryStore.getCategoryById(id);
    } catch (err) {
      console.log(err);
    }
  }

  const getGamesByCategory = () => {
    try {
      gameStore.getGamesByCategory(id);
    } catch (err) {
      console.log(err);
    }
  }

  onMount(getCategoryByID);
  onMount(getGamesByCategory);
</script>