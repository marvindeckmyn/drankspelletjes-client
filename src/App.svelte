<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import { Login } from './components/pages';
  import { LanguageSelector } from './components/partials';

	export let url = "";
</script>

<header>
  <LanguageSelector/>
</header>

<Router {url}>
  <Route path="/jorisblomme/login" component={Login}/>
</Router>