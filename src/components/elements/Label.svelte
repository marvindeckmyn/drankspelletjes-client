<script lang="ts">
  export let text = "";
  export let required = false;
  export let htmlFor = "";

  import { FormattedMessage } from './'
</script>

<label class="label" for={htmlFor}>
  <FormattedMessage id={text} />
  {#if required}
    <span class="required">*</span>
  {/if}
</label>
