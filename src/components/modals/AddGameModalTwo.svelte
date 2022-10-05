<script lang="ts">
  import { categoryStore, gameStore, globalStore, 
    modalStore, necessityStore } from "../../stores";
  import { FormattedMessage, Modal, Button } from "../elements";
  import { AddGameFormTwo } from "../forms";
    import { Game } from "../models";
  import Validator from "../validator/Validator";
  import { getNotificationsContext } from 'svelte-notifications';
  import { translate } from '../../i18n';

  const { newGame, games} = gameStore;
  const { selectedCategory } = categoryStore;
  const { lang } = globalStore;
  const { addNotification } = getNotificationsContext();

  const closeModal = () => {
    modalStore.closeModal('addGameTwo');
  }

  const previousModal = () => {
    closeModal();
    modalStore.openModal('addGameOne');
  }

  const addGame = async () => {
    try {
      await Validator.validate($newGame, $newGame.validationTwo);

      const reader = new FileReader();
      const response = await fetch($newGame.imageBlob);
      const blob = await response.blob();

      reader.readAsDataURL(blob);
      reader.onload = async () => {
        $newGame.img = reader.result as string;
        $newGame.img = $newGame.img.split(',')[1];

        $newGame.game_category = $selectedCategory.id;
        $newGame.order = $games.length + 1;

        const gameId = await gameStore.postGame();

        await necessityStore.postNecessities(gameId);

        newGame.update(game => {
          game = new Game(undefined);
          return game;
        })

        addNotification({
          text: translate('game_added', $lang),
          position: 'top-center',
          type: 'success',
          removeAfter: 2000,
        })

        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  } 

  $: game = {"game": $newGame.name[$lang]};
</script>

<Modal id="addGameTwo">
  <div class="modal-header">
    <h1>
      <FormattedMessage id="explain_the_drinking_game"
      replacements={game}/>
    </h1>

    <h2>
      <FormattedMessage id="step_two_of_two"/>
    </h2>
  </div>

  <div class="modal-content">
    <AddGameFormTwo/>
  </div>

  <div class="modal-footer previous">
    <div>
      <Button text="previous" onClick={previousModal}/>
    </div>

    <div id="add">
      <Button text="add_drinking_game" onClick={addGame}/>
      <Button text="close_modal" onClick={closeModal} />
    </div>
  </div>
</Modal>