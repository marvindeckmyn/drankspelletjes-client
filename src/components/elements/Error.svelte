<script lang="ts">
  import { FormattedMessage } from '../elements';
  export let errors = []

</script>

{#if errors.length !== 0}
  <div class="errorContainer">
    <span>
      <FormattedMessage id="solve_the_following_errors"/>
    </span>

    <ul>
      {#each errors as error}
        <li>
          <FormattedMessage id={error.message} />
        </li>
      {/each}
    </ul>
  </div>
{/if}



<style type="text/scss">
  @import '../../assets/scss/error.scss'
</style>
