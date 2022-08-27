import { Account } from '../components/models';
import { doFetch } from '../utils';
import { navigate } from 'svelte-routing';

const URLS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
}

class AuthStore {
  account: Account;

  constructor() {
    this.account = new Account(undefined)
  }

  // login to log in an account.
  login = async () => {
    const { email, password } = this.account

    const { status } = await doFetch(URLS.LOGIN, 'POST', {
      email,
      password,
    });

    if (status !== 200) {
      throw new Error('FAILED_TO_LOG_IN');
    }

    navigate('/jorisblomme');
  }

  logout = () => {
    return doFetch(URLS.LOGOUT, 'POST')
  };

}

export default new AuthStore();