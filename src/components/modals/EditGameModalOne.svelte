<script lang="ts">
  import { gameStore, globalStore, modalStore } from "../../stores";
  import { Button, FormattedMessage, Modal, SingleError } from "../elements";
  import Validator from "../validator/Validator";
  import { getNotificationsContext } from 'svelte-notifications';
    import { EditGameFormOne } from "../forms";

  const { selectedGame } = gameStore;
  const { lang } = globalStore;
  let errorMessage: string;

  const closeModal = () => {
    modalStore.closeModal('editGameOne');
  }

  const goToStepTwo = async () => {
    try {
      await Validator.validate($selectedGame, $selectedGame.validationOne);
      closeModal();
      modalStore.openModal('editGameTwo');
    } catch (err) {
      errorMessage = err.message;
    }
  }
</script>

<Modal id="editGameOne">
  <div class="modal-header">
    <h1>
      <FormattedMessage id="edit_game"/>
      <i class="fas fa-times" on:click={closeModal}/>
    </h1>

    <h2>
      <FormattedMessage id="step_one_of_two"/>
      ({$selectedGame.name[$lang]})
    </h2>
  </div>

  <div class="modal-content">
    <EditGameFormOne/>
  </div>

  <div class="modal-footer">
    <Button text="next" onClick={goToStepTwo} />
    <Button text="close_modal" onClick={closeModal} />
  </div>
</Modal>