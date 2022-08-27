<script lang="ts">
  import { modalStore, categoryStore } from '../../stores';
  import { Modal, Button, FormattedMessage } from '../elements/';
  import { AddCategoryForm } from '../forms';
  import Validator from '../validator/Validator';

  const { newCategory } = categoryStore;

  const closeModal = () => {
    modalStore.closeModal('addCategory');
  };

  const addCategory = async () => {
    try {
      await Validator.validate($newCategory);
      
      await categoryStore.postCategory();
      modalStore.closeModal('addCategory');
    } catch (err) {
      console.log(err)
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
    <AddCategoryForm />
  </div>
  <div class="modal-footer">
    <Button text="add_new_category" onClick={addCategory} />
    <Button text="close_modal" onClick={closeModal} />
  </div>
</Modal>