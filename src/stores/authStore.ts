import { Account } from '../components/models';
import { doFetch } from '../utils';

const URLS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
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

  logout = () => {
    return doFetch(URLS.LOGOUT, 'POST')
  };

}

export default new AuthStore();