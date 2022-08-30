<script lang="ts">
  import { authStore } from '../../stores';
  import { FormattedMessage, Button, SingleError } from '../elements';
  import { LoginForm } from '../forms';
  import Validator from '../validator/Validator';

  const { account } = authStore;
  let errorMessage: string;

  const login = async () => {
    try {
      await Validator.validate(account, account.validation);
      await authStore.login();
    } catch (err) {
      errorMessage = err.message;
    }
  }
</script>

<main>
  <h1>
    <FormattedMessage id="login"/>
  </h1>

  <SingleError error={errorMessage}/>

  <LoginForm/>

  <Button text="login" onClick={login}/>
</main>