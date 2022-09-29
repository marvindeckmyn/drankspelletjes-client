<script lang="ts">
  import { onMount } from 'svelte';
  import type { Game } from '../models';
  import { categoryStore, gameStore, globalStore } from '../../stores';
    import { Button } from '../elements';

  const { selectedCategory } = categoryStore;
  const { lang } = globalStore;

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

  const openAddGameModal = () => {

  }

  onMount(getCategoryByID);
  onMount(getGamesByCategory);
</script>

<main>
  <h1>{$selectedCategory.name[$lang]}</h1>

  <section id="games">
    <div id="buttons">
      <Button text="add_new_drinking_game" onClick={openAddGameModal} />
    </div>
  </section>
</main>