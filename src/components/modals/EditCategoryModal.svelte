<script lang="ts">
  import { FormattedMessage, Modal, Button, SingleError } from '../elements';
  import { modalStore, categoryStore, globalStore } from '../../stores';
  import { EditCategoryForm } from '../forms';
  import Validator from '../validator/Validator';
  import { getNotificationsContext } from 'svelte-notifications';
  import { translate } from '../../i18n';

  const { selectedCategory } = categoryStore;
  const { lang } = globalStore;
  const { addNotification } = getNotificationsContext();
  let errorMessage: string;

  const closeModal = () => {
    modalStore.closeModal('editCategory');
  }

  const editCategory = async () => {
    try {
      await Validator.validate($selectedCategory)
      await categoryStore.updateCategory();

      addNotification({
        text: translate('category_updated', $lang),
        position: 'top-center',
        type: 'success',
        removeAfter: 2000,
      })

      closeModal();
    } catch (err) {
      errorMessage = err.message;
    }
  }
  
</script>

<Modal id="editCategory">
  <div class="modal-header">
    <h1>
      <FormattedMessage id="edit_category"/>
      <i class="fas fa-times" on:click={closeModal}/>
    </h1>

    <h2>
      {$selectedCategory.name[$lang]}
    </h2>
  </div>

  <div class="modal-content">
    <SingleError error={errorMessage}/>
    <EditCategoryForm/>
  </div>

  <div class="modal-footer">
    <Button text="edit_category" onClick={editCategory} />
    <Button text="close_modal" onClick={closeModal} />
  </div>

</Modal>