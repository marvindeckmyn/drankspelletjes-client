<script lang="ts">
  import { authStore } from '../../stores';
  import { FormattedMessage, Button } from '../elements';
  import { LoginForm } from '../forms';
  import Validator from '../validator/Validator';

  const { account } = authStore;

  const login = async () => {
    try {
      await Validator.validate(account, account.validation);
      await authStore.login();
    } catch (err) {
      console.log(err);
    }
  }
</script>

<main>
  <h1>
    <FormattedMessage id="login"/>
  </h1>

  <LoginForm/>

  <Button text="login" onClick={login}/>
</main>