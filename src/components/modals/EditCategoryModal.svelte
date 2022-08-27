<script lang="ts">
  import { FormattedMessage, Modal, Button } from '../elements';
  import { modalStore, categoryStore } from '../../stores';
  import { EditCategoryForm } from '../forms';
  import Validator from '../validator/Validator';

  const { selectedCategory } = categoryStore;

  const closeModal = () => {
    modalStore.closeModal('editCategory');
  }

  const editCategory = async () => {
    try {
      await Validator.validate($selectedCategory)
      await categoryStore.updateCategory();
      modalStore.closeModal('editCategory');
    } catch (err) {
      console.log(err);
    }
  }
  
</script>

<Modal id="editCategory">
  <div class="modal-header">
    <h1>
      <FormattedMessage id="edit_category"/>
      <i class="fas fa-times" on:click={closeModal}/>
    </h1>
  </div>

  <div class="modal-content">
    <EditCategoryForm/>
  </div>

  <div class="modal-footer">
    <Button text="edit_category" onClick={editCategory} />
    <Button text="close_modal" onClick={closeModal} />
  </div>

</Modal>