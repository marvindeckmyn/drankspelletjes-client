<script lang="ts">
  export let list: any[] = [];
  export let value: any;
  export let itemText = "";
  export let itemValue = "";
  export let className = "";
  export let onChange: (value: string) => void = undefined;

  import { get } from 'svelte/store';

  const getCurrentValue = () => {
    try {
      return get(value) 
    } catch (err) {
      return value
    }
  }

  const validateInitialValue = (list: any[]) => {
    const currentValue = getCurrentValue();

    const values = list.map((item: any) => item[itemValue]);

    if (!values.includes(currentValue) && values.length > 0) {
      value = values[0];
    }
  }

  const onChangeInput = (ev: Event) => {
    const target = ev.target as HTMLSelectElement;
    value = target.value
    if (onChange !== undefined) {
      onChange(value);
    }
  };

  $: validateInitialValue(list)
</script>

<select bind:value={value} class={className} on:change={onChangeInput}>
  {#each list as item}
    <option value={item[itemValue]}>
      {item[itemText]}
    </option>
  {/each}
</select>
