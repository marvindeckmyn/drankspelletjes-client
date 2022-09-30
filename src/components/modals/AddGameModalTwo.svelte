<script lang="ts">
  import { gameStore, globalStore, modalStore } from "../../stores";
  import { FormattedMessage, Modal, Button } from "../elements";
  import { AddGameFormTwo } from "../forms";

  const { newGame } = gameStore;
  const { lang } = globalStore;

  const closeModal = () => {
    modalStore.closeModal('addGameTwo');
  }

  const previousModal = () => {
    closeModal();
    modalStore.openModal('addGameOne');
  }

  const addGame = async () => {

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