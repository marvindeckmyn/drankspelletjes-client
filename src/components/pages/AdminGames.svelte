<script lang="ts">
  import { onMount } from 'svelte';
  import type { Game } from '../models';
  import { categoryStore, gameStore,
    globalStore, modalStore } from '../../stores';
  import { Button, Dropdown, FormattedMessage, Spinner } from '../elements';
  import { AddGameModalOne, AddGameModalTwo } from '../modals';

  const { selectedCategory } = categoryStore;
  const { games } = gameStore;
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
    modalStore.openModal('addGameOne');
  }

  const openEditGameModal = (ev: Event, game: Game) => {
    gameStore.setSelectedGame(game);
    modalStore.openModal('editGame');
    ev.stopPropagation();
  }

  const openDeleteGameModal = (ev: Event, game: Game) => {
    try {
      gameStore.setSelectedGame(game);
      modalStore.openModal('deleteGame');
      ev.stopPropagation();
    } catch (err) {
      console.log(err);
    }
  }

  const handleDragStart = (ev: DragEvent, game: Game) => {
    const target = ev.currentTarget as HTMLLIElement;
    target.style.opacity = '0.4';

    dragSrcEl = target;
    dragSrcGame = game;

    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/html', target.innerHTML);
  }

  const handleDragEnd = (ev: Event) => {
    const target = ev.currentTarget as HTMLLIElement;
    target.style.opacity = '1';
  }

  const handleDragOver = (ev: Event) => {
    ev.preventDefault();
    return false;
  }

  const handleDragEnter = (ev: Event) => {
    const target = ev.currentTarget as HTMLLIElement;
    target.classList.add('over');
  }

  const handleDragLeave = (ev: Event) => {
    const target = ev.currentTarget as HTMLLIElement;
    target.classList.remove('over');
  }

  const handleDrop = (ev: DragEvent, game: Game) => {
    ev.stopPropagation();
    const target = ev.currentTarget as HTMLLIElement;
    const orderDragged = dragSrcGame.order;
    const orderTarget = game.order;

    if (dragSrcEl !== target) {
      dragSrcEl.innerHTML = target.innerHTML;

      dragSrcGame.order = orderTarget;
      gameStore.setSelectedGame(dragSrcGame);
      gameStore.updateGame();

      game.order = orderDragged;
      gameStore.setSelectedGame(game);
      gameStore.updateGame();

      target.innerHTML = ev.dataTransfer.getData('text/html');
    }

    return false;
  }

  onMount(getCategoryByID);
  onMount(getGamesByCategory);
</script>

<main>
  <h1>{$selectedCategory.name[$lang]}</h1>

  <section id="games">
    <AddGameModalOne />
    <AddGameModalTwo />

    <div id="buttons">
      <Button text="add_new_drinking_game" onClick={openAddGameModal} />
    </div>

    {#if $games.length !== 0}
    <ul>
      {#each $games as game}
      <li draggable="true" on:dragstart={(ev) => handleDragStart(ev, game)} 
        on:dragend={handleDragEnd} on:dragover={handleDragOver} 
        on:dragenter={handleDragEnter} on:dragleave={handleDragLeave} 
        on:drop={(ev) => handleDrop(ev, game)}>
        <div>
          <div id="name">
            <h3>
              {game.name[$lang]}
            </h3>
          </div>
        </div>

        <Dropdown>

          <li on:click={(ev) => openEditGameModal(ev, game)}>
            <FormattedMessage id="edit_game"/>
          </li>
          <li on:click={(ev) => openDeleteGameModal(ev, game)}>
            <FormattedMessage id="delete_game"/>
          </li>
        </Dropdown>
      </li>

      {:else}
      <Spinner/>
      {/each}
    </ul>
    {/if}

    {#if $games.length === 0}
    <p>
      <FormattedMessage id="there_are_no_drinking_games" />
    </p>
    {/if}
  </section>
</main>

<style type="text/scss">
  @import "../../assets/scss/game.scss";
</style>