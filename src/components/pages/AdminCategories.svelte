<script lang="ts">
  import { onMount } from 'svelte';
  import { categoryStore, globalStore, modalStore } from '../../stores';
  import { FormattedMessage, Button, Spinner, Dropdown } from '../elements';
  import { AddCategoryModal, EditCategoryModal, 
    DeleteCategoryModal } from '../modals';
  import type { Category } from '../models';
  import { navigate } from 'svelte-routing';

  let dragSrcEl;
  let dragSrcCategory: Category;

  const { categories } = categoryStore;
  const { lang } = globalStore;

  const getCategories = () => {
    try {
      categoryStore.getCategories();
    } catch (err) {
      console.log(err);
    }
  }

  const openAddCategoryModal = () => {
    modalStore.openModal('addCategory');
  };

  const handleDragStart = (ev: DragEvent, category: Category) => {
    const target = ev.currentTarget as HTMLLIElement;
    target.style.opacity = '0.4';

    dragSrcEl = target;
    dragSrcCategory = category;

    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData('text/html', target.innerHTML)
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

  const handleDrop = (ev: DragEvent, category: Category) => {
    ev.stopPropagation();
    const target = ev.currentTarget as HTMLLIElement;
    const orderDragged = dragSrcCategory.order;
    const orderTarget = category.order;

    if (dragSrcEl !== target) {
      dragSrcEl.innerHTML = target.innerHTML;

      dragSrcCategory.order = orderTarget;
      categoryStore.setSelectedCategory(dragSrcCategory);
      categoryStore.updateCategory();

      category.order = orderDragged;
      categoryStore.setSelectedCategory(category);
      categoryStore.updateCategory();

      target.innerHTML = ev.dataTransfer.getData('text/html');
    }
    return false;
  }

  const goToGame = (category: Category) => {
    categoryStore.setSelectedCategory(category);
    navigate(`/jorisblomme/categories/games/${category.id}`);
  }

  const openEditCategoryModal = (ev: Event, category: Category) => {
    categoryStore.setSelectedCategory(category);
    modalStore.openModal('editCategory');
    ev.stopPropagation();
  }

  const openDeleteCategoryModal = (ev: Event, category: Category) => {
    try {
      categoryStore.setSelectedCategory(category);
      modalStore.openModal('deleteCategory');
      ev.stopPropagation();
    } catch (err) {
      console.log(err);
    }
  }

  onMount(getCategories);
</script>

<main>
  <div class="main-header">
    <h1>
      <FormattedMessage id="categories" />
    </h1>
  </div>

  <section id="categories">
    <AddCategoryModal />
    <EditCategoryModal />
    <DeleteCategoryModal />

    <Button text="add_new_category" onClick={openAddCategoryModal} />

    {#if $categories.length !== 0}
    <ul>
      {#each $categories as category}
      <li draggable="true" on:dragstart={(ev) => handleDragStart(ev, category)} 
        on:dragend={handleDragEnd} on:dragover={handleDragOver} 
        on:dragenter={handleDragEnter} on:dragleave={handleDragLeave} 
        on:drop={(ev) => handleDrop(ev, category)} on:click={() => goToGame(category)}>
        <div>
          <div id="name">
            <h3>
              {category.name[$lang]}
            </h3>
          </div>
        </div>

        <Dropdown>
          <li on:click={() => goToGame(category)}>
            <FormattedMessage id="view_games"/>
          </li>
          <li on:click={(ev) => openEditCategoryModal(ev, category)}>
            <FormattedMessage id="edit_category"/>
          </li>
          <li on:click={(ev) => openDeleteCategoryModal(ev, category)}>
            <FormattedMessage id="delete_category"/>
          </li>
        </Dropdown>
      </li>

      {:else}
      <Spinner/>
      {/each}
    </ul>
    {/if}

    {#if $categories.length === 0}
    <p>
      <FormattedMessage id="there_are_no_categories" />
    </p>
    {/if}
  </section>
</main>

<style type="text/scss">
  @import "../../assets/scss/category.scss";
</style>
