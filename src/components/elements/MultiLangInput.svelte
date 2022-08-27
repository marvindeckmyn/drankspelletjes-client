<script lang="ts">
  import { globalStore } from '../../stores';
  import { translate } from '../../i18n';

  export let value: any;
  export let placeholder: string;

  let selectedLanguage = 'en';

  const { supportedLanguages, lang } = globalStore;

  const onChange = (ev: Event) => {
    const target = ev.target as HTMLSelectElement;
    selectedLanguage = target.value
  };

  let placeholderContent = '';

  $: placeholderContent = translate(placeholder, $lang)

</script>

<div class="multilang">
  <input type="text" bind:value={value[selectedLanguage]} placeholder={placeholderContent}>
  <select bind:value={selectedLanguage} on:change={onChange}>
    {#each $supportedLanguages as language}
      <option value={language.short}>
        {language.short.toUpperCase()}
      </option>
    {/each}
  </select>
</div>

<style type="text/scss">
  .multilang {
    display: grid;
    grid-template-columns: 1fr 80px;
    grid-gap: 10px;
  }
</style>
