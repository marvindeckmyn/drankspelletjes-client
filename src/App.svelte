<script lang="ts">
  import { Router, Route } from 'svelte-routing';
  import { Login } from './components/pages';

	export let url = "";
</script>

<Router {url}>
  <Route path="/jorisblomme/login" component={Login}/>
</Router>