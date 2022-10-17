<script lang="ts">
  import { gameStore } from '../../stores';
  import { Error } from '../elements';
  let errors = [];

  const { selectedGame } = gameStore;
</script>

<Error errors={errors} />

<div>

</div>