<script lang="ts">
  import { gameStore } from "../../stores";
  import { Label, MultiLangTextEditor, Error } from "../elements";

  let errors = [];

  const { newGame } = gameStore;

  $newGame.getActiveErrors().subscribe(activeErrors => {
    errors = activeErrors;
  })
</script>

<Error errors={errors}/>

<div>
  <Label htmlFor="description" text="description" />
  <MultiLangTextEditor
    bind:value={$newGame.description}
  />
</div>