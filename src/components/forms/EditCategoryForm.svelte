<script lang="ts">
  import { categoryStore } from '../../stores';
  import { Label, MultiLangInput, Error } from '../elements';

  let errors = [];

  const { selectedCategory } = categoryStore;

  $selectedCategory.getActiveErrors().subscribe(activeErrors => {
    errors = activeErrors;
  })
</script>

<Error errors={errors} />

<div>
  <div>
    <Label htmlFor="name" text="name" />
    <MultiLangInput
      bind:value={$selectedCategory.name}
      placeholder="placeholder_category_name"
    />
  </div>
</div>