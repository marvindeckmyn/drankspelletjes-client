<script lang="ts">
  import { globalStore } from '../../stores';
  import { onMount, onDestroy } from 'svelte';
  import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
  import { FormattedMessage } from '.';

  export let value: any;

  let selectedLanguage = 'en';
  let content = value[selectedLanguage];
  let element;
	let editor;

  const { supportedLanguages } = globalStore;

  const createEditor = () => {
    editor = new Editor({
      element,
      extensions: [StarterKit],
      content,
      onTransaction: () => {
        editor = editor;
      }
    });
    editor.on('update', ({ editor }) => {
      value[selectedLanguage] = editor.getHTML();
    })
  }

  const onChange = (ev: Event) => {
    const target = ev.target as HTMLSelectElement;
    selectedLanguage = target.value;
    content = value[selectedLanguage];

    editor.destroy();
    createEditor();
  };

  onMount(() => {
    createEditor();
  });

  onDestroy(() => {
    editor.destroy();
	});
</script>

<div class="multilang">
  <input type="hidden" bind:value={value[selectedLanguage]} disabled>
  <select bind:value={selectedLanguage} on:change={onChange}>
    {#each $supportedLanguages as language}
      <option value={language.short}>
        {language.short.toUpperCase()}
      </option>
    {/each}
  </select>
  
  {#if editor}
  <div class="style-buttons">
  <button
    on:click={() => console.log && editor.chain().focus().toggleBold().run()}
    class={editor.isActive("bold") ? "is-active" : ""}
  >
    B
  </button>
  <button
    on:click={() => editor.chain().focus().toggleItalic().run()}
    class={editor.isActive("italic") ? "is-active" : ""}
  >
    I
  </button>
  <button
    on:click={() => editor.chain().focus().toggleStrike().run()}
    class={editor.isActive("strike") ? "is-active" : ""}
  >
    S
  </button>

  <button on:click={() => editor.chain().focus().setParagraph().run()} class:active={editor.isActive('paragraph')}>
    P
  </button>

  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
    class:active={editor.isActive('heading', { level: 1 })}
  >
    H1
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive('heading', { level: 2 })}
  >
    H2
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
    class={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
  >
    H3
  </button>

  <button
    on:click={() => editor.chain().focus().toggleBulletList().run()}
    class={editor.isActive("bulletList") ? "is-active" : ""}
  >
    <FormattedMessage id="bullet_list"/>
  </button>
  </div>

{/if}

  <div class="editor">
    <div bind:this={element}/>
  </div>
  
</div>