<script lang="ts">
  export let type = 'text'
  export let step = '';
  export let min = '';
  export let name: string;
  export let placeholder: string;
  export let entity: any;

  import Validator from '../validator/Validator';
  import { globalStore } from '../../stores/';
  import { translate } from '../../i18n';

  const handleInput = (ev: Event) => {
    const target = ev.target as HTMLSelectElement;

    entity[name] = type.match(/^(number|range)$/)
      ? +target.value
      : target.value
  };

  const validate = async () => {
    await Validator.validateKey(entity, name)
  };

  const { lang } = globalStore;
  const { errors } = entity;

  let placeholderContent = '';
  let hasError = false;

  $: placeholderContent = translate(placeholder, $lang)
  $: hasError = $errors[name]?.error || false;

</script>

<input
  type={type}
  name={name}
  placeholder={placeholderContent}
  step={step}
  min={min}
  on:input={handleInput}
  on:blur={validate}
  value={entity[name]}
  style={hasError && `border-bottom: 2px solid #ff6161`}
/>
