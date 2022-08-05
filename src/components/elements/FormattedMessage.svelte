<script lang="ts">
  export let id: string
  export let replacements: {[key: string]: string} = {}

  import { globalStore } from '../../stores/';
  import { translate } from '../../i18n';

  const { lang } = globalStore;

  let content = '';
  $: content = translate(id, $lang, replacements)
</script>

{ content }
