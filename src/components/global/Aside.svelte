<script lang="ts">
  import { onMount } from 'svelte';
  import { accountStore, authStore, globalStore } from '../../stores';
  import { navigate, Link } from "svelte-routing";
  import { FormattedMessage}  from '../elements';
  
  const { account } = accountStore;
  const { currentPath } = globalStore;

  let error: string;

  const logout = async () => {
    const res = await authStore.logout();

    if (res.status !== 200) {
      error = 'Error while logging out. Try again later.';
      return
    }

    $account.authenticated = false;
    navigate('/jorisblomme/login');
  }

  onMount(accountStore.getAccount);
</script>

<aside>
  <div>
    <h1>Drinkin.gg</h1>

    {#if $account.authenticated}
    <p>
      <FormattedMessage id="hi"/> <span>{$account.name}</span>
    </p>
    {/if}

    {#if $account.authenticated}
     <ul>
       <li>
         <Link id={$currentPath.includes('categories') && 'active'} to={`/jorisblomme/categories`}>
           <FormattedMessage id="drinking_games"/>
         </Link>
       </li>
     </ul> 

     <div id="logout" on:click={logout}>
       <p>
        <FormattedMessage id="logout"/>
       </p>

       {#if error}
         <span>{error}</span>
       {/if}
     </div>
  {/if}

  </div>
</aside>

<style type="text/scss">
  @import "../../assets/scss/sidebar.scss";
</style>
