<script lang="ts">
  import { categoryStore, globalStore, modalStore } from "../../stores";
  import { getNotificationsContext } from 'svelte-notifications';
  import { translate } from '../../i18n';
  import { Modal, FormattedMessage, Button } from "../elements";

  const { selectedCategory } = categoryStore;
  const { lang } = globalStore;
  const { addNotification } = getNotificationsContext();

  const closeModal = () => {
    modalStore.closeModal('deleteCategory');
  }

  const deleteCategory = async () => {
    try {
      await categoryStore.deleteCategory($selectedCategory);

      addNotification({
        text: translate('category_deleted', $lang),
        position: 'top-center',
        type: 'success',
        removeAfter: 2000,
      })

      closeModal();
    } catch (err) {
      console.log(err);
    }
  }

  $: category = {'category': $selectedCategory.name[$lang]};
</script>

<Modal id="deleteCategory">
  <div class="modal-header" id="delete">
    <h1>
      <FormattedMessage id="delete_category"/>
      <i class="fas fa-times" on:click={closeModal} />
    </h1>
  </div>

  <div class="modal-content">
    <p>
      <FormattedMessage id="are_you_sure_you_want_to_delete_category"
      replacements={category}/>
    </p>
  </div>

  <div class="modal-footer">
    <Button text="delete_category" onClick={deleteCategory} />
    <Button text="close_modal" onClick={closeModal} />
  </div>
</Modal>