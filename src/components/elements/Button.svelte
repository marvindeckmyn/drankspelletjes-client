<script lang="ts">
  import { FormattedMessage } from './';
  export let text = '';
  export let onClick: any;
  export let className = "";

</script>

<div class={`btn ${className}`} on:click={onClick}>
  <FormattedMessage id={text} />
</div>
