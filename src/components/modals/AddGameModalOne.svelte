<script lang="ts">
  import { gameStore, modalStore } from "../../stores";
  import { Button, FormattedMessage, Modal } from "../elements";
  import { AddGameFormOne } from '../forms';
  import Validator from "../validator/Validator";

  const { newGame } = gameStore;

  const closeModal = () => {
    modalStore.closeModal('addGameOne');
  }

  const goToStepTwo = async () => {
    try {
      await Validator.validate($newGame, $newGame.validationOne);
      closeModal();
      modalStore.openModal('addGameTwo');
    } catch (err) {
      console.log(err);
    }
  }

</script>

<Modal id="addGameOne">
  <div class="modal-header">
    <h1>
      <FormattedMessage id="fill_in_the_drinking_game_details"/>
      <i class="fas fa-times" on:click={closeModal} />
    </h1>

    <h2>
      <FormattedMessage id="step_one_of_two"/>
    </h2>
  </div>

  <div class="modal-content">
    <AddGameFormOne />
  </div>

  <div class="modal-footer">
    <Button text="next" onClick={goToStepTwo} />
    <Button text="close_modal" onClick={closeModal} />
  </div>
</Modal>