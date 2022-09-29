<script lang="ts">
  export let name: string;
  export let entity: any;

  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    entity[name] = target.checked
  };
</script>

<input
  type="checkbox"
  on:input={handleInput}
/>