<script lang="ts">
  import { modalStore, categoryStore, globalStore } from '../../stores';
  import { Modal, Button, FormattedMessage, SingleError } from '../elements/';
  import { AddCategoryForm } from '../forms';
  import { Category } from '../models';
  import Validator from '../validator/Validator';
  import { getNotificationsContext } from 'svelte-notifications';
  import { translate } from '../../i18n';

  const { newCategory } = categoryStore;
  const { lang } = globalStore;
  const { addNotification } = getNotificationsContext();
  let errorMessage: string;

  const closeModal = () => {
    modalStore.closeModal('addCategory');
  };

  const addCategory = async () => {
    try {
      await Validator.validate($newCategory);
      await categoryStore.postCategory();

      newCategory.update(category => {
        category = new Category(undefined);
        return category
      })

      addNotification({
        text: translate('category_added', $lang),
        position: 'top-center',
        type: 'success',
        removeAfter: 2000,
      })
      
      closeModal();
    } catch (err) {
      errorMessage = err.message;
    }
  };


</script>

<Modal id="addCategory">
  <div class="modal-header">
    <h1>
      <FormattedMessage id="add_new_category"/>
      <i class="fas fa-times" on:click={closeModal} />
    </h1>
  </div>
  <div class="modal-content">
    <SingleError error={errorMessage}/>
    <AddCategoryForm />
  </div>
  <div class="modal-footer">
    <Button text="add_new_category" onClick={addCategory} />
    <Button text="close_modal" onClick={closeModal} />
  </div>
</Modal>