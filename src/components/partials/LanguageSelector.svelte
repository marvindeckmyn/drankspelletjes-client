<script lang="ts">
  import { Select } from '../elements';
  import { globalStore } from '../../stores';
  const { supportedLanguages, lang } = globalStore;
</script>

<Select 
  bind:value={$lang}
  className="languageSelector"
  list={$supportedLanguages}
  itemText="long"
  itemValue="short"
/>
