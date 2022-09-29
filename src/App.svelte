<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import { Login, AdminGames, AdminSubmissions,
  AdminOverview, AdminCategories } from './components/pages';
  import { LanguageSelector } from './components/partials';
  import { Aside } from './components/global';
  import { globalStore } from './stores';
  import { onMount, onDestroy } from 'svelte';
  import { globalHistory } from 'svelte-routing/src/history';
  import Notifications from 'svelte-notifications';

  const { currentPath } = globalStore;
  let unsub = undefined;

  onMount(() => {
    unsub = globalHistory.listen(({ location, action }) => {
      $currentPath = location.pathname
    })
  })

  onDestroy(() => {
    unsub()
  })


	export let url = "";
</script>

<Notifications>

<Router {url}>

  <header>
    <LanguageSelector/>
  </header>
  
  <Aside />
  
  <Route path="/jorisblomme" component={AdminOverview} />
  <Route path="/jorisblomme/login" component={Login} />
  <Route path="/jorisblomme/categories" component={AdminCategories} />
  <Route path="/jorisblomme/submissions" component={AdminSubmissions} />

  <Route path="/jorisblomme/categories/games/:id" let:params>
    <AdminGames id="{params.id}"/>
  </Route>
</Router>

</Notifications>
