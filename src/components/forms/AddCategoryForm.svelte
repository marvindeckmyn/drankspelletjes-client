<script lang="ts">
  import { Label, MultiLangInput, Error } from "../elements";
  import { categoryStore } from '../../stores';

  const { newCategory, categories } = categoryStore;

  let errors = [];

  $newCategory.order = $categories.length + 1;

  $newCategory.getActiveErrors().subscribe(activeErrors => {
    errors = activeErrors;
  })

</script>

<Error errors={errors}/>

<div>
  <div>
    <Label htmlFor="name" text="name"/>
    <MultiLangInput
      placeholder="placeholder_category_name"
      bind:value={$newCategory.name}
    />
  </div>
</div>