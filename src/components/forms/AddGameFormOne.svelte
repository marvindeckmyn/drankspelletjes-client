<script lang="ts">
  import { gameStore } from '../../stores';
  import { AddButton, Checkbox, DeleteButton,
    Error, Input, Label, MultiLangInput } from '../elements';
  import { GameNecessity } from '../models';
  import { ImageCropper } from '../partials';

  let errors = [];

  const { newGame, newNecessity, newNecessities } = gameStore;

  const addNecessity = () => {
    newNecessities.update(necessities => {
      necessities.push($newNecessity);
      return necessities;
    })

    newNecessity.update(necessity => {
      necessity = new GameNecessity(undefined);

      return necessity;
    })
  }

  const removeNecessity = (necessity: GameNecessity) => {
    newNecessities.update(necessities => {
      const index = necessities.indexOf(necessity);
      if (index > -1) {
        necessities.splice(index, 1);
      }

      return necessities;
    })
  }
</script>

<Error errors={errors} />

<div class="form">
  <ImageCropper
    bind:value={$newGame.imageBlob}
  />

  <div class="grid">
    <div>
      <Label htmlFor="name" text="name" />
      <MultiLangInput
        placeholder="placeholder_game_name"
        bind:value={$newGame.name}
      />
    </div>

    <div>
      <Label htmlFor="alias" text="alias" />
      <MultiLangInput
        placeholder="placeholder_game_alias"
        bind:value={$newGame.alias}
      />
    </div>

    <div>
      <Label htmlFor="player_count" text="player_count" />
      <Input
      entity={$newGame}
      name="player_count"
      placeholder="placeholder_game_player_count"
      type="number"
      />
    </div>

    <div>
      <div>
        <Label htmlFor="necessities" text="necessities" />
      </div>

      {#each $newNecessities as necessity}
      <div class="necessityform">
        <MultiLangInput
          placeholder="placeholder_game_necessity_name"
          bind:value={necessity.name}
        />
        
        <DeleteButton onClick={() => removeNecessity(necessity)} />
      </div>
      {/each}

      <div class="necessityform">
        <MultiLangInput
          placeholder="placeholder_game_necessity_name"
          bind:value={$newNecessity.name}
        />

        <AddButton onClick={addNecessity} />
      </div>
    </div>

    <div>
      <Label htmlFor="credits" text="credits" />
      <Input
      entity={$newGame}
      name="credits"
      placeholder="placeholder_game_credits"
      />
    </div>

    <div id="check">
      <Checkbox
        entity={$newGame}
        name="highlight"
      />
      <Label htmlFor="highlight" text="highlight_game"/>
    </div>
  </div>
</div>