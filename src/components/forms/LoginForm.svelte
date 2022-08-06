<script lang="ts">
  import { authStore } from '../../stores';
  import { Label, Input, Error } from '../elements/';

  const { account } = authStore;

  let errors = [];
  
  account.getActiveErrors().subscribe(activeErrors => {
    errors = activeErrors;
  })
</script>

<Error errors={errors} />

<div>
  <Label htmlFor="email" text="email" />
  <Input 
    type="email" 
    name="email" 
    placeholder="email_placeholder" 
    entity={account}
  />
</div>

<div>
  <Label htmlFor="password" text="password"/>
    <Input 
      type="password" 
      name="password" 
      placeholder="password_placeholder" 
      entity={account}
    />
</div>
