<script lang="ts">
  import { FormattedMessage } from './';
  export let text = '';
  export let onClick: any;

</script>

<div class="btn" on:click={onClick}>
  <FormattedMessage id={text} />
</div>
