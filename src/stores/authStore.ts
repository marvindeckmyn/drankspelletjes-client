import { Account } from '../components/models';
import { doFetch } from '../utils';

const URLS = {
  LOGIN: '/api/auth.login',
}

class AuthStore {
  account: Account;

  constructor() {
    this.account = new Account(undefined)
  }

  login = async () => {
    const { email, password } = this.account

    return doFetch(URLS.LOGIN, 'POST', {
      email,
      password,
    });
  }
}

export default new AuthStore();