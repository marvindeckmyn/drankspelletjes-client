<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import { Login, AdminGames, AdminSubmissions,
  AdminOverview } from './components/pages';
  import { LanguageSelector } from './components/partials';
  import { Aside } from './components/global';

	export let url = "";
</script>



<Router {url}>

  <header>
    <LanguageSelector/>
  </header>
  
  <Aside />
  
  <Route path="/jorisblomme" component={AdminOverview} />
  <Route path="/jorisblomme/login" component={Login} />
  <Route path="/jorisblomme/games" component={AdminGames} />
  <Route path="/jorisblomme/submissions" component={AdminSubmissions} />
</Router>