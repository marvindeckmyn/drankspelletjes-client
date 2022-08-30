<script lang="ts">
  import { FormattedMessage } from '../elements';
  export let error: string;
</script>

{#if error}
  <div class="errorContainer">
    <span>
      <FormattedMessage id={error} />
    </span>
  </div>
{/if}

<style type="text/scss">
  @import '../../assets/scss/singleError.scss'
</style>