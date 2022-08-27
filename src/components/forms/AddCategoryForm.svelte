<script lang="ts">
import { Label, MultiLangInput } from "../elements";
import { categoryStore } from '../../stores';

let errors = [];

const { newCategory, categories } = categoryStore;

$newCategory.order = $categories.length + 1;

$newCategory.getActiveErrors().subscribe(activeErrors => {
  errors = activeErrors;
})

</script>

<div>
  <div>
    <Label htmlFor="name" text="name"/>
    <MultiLangInput
      placeholder="placeholder_category_name"
      bind:value={$newCategory.name}
    />
  </div>
</div>