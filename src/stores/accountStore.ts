import { Account } from '../components/models';
import { writable, Writable } from 'svelte/store';
import { doFetch } from '../utils';
import { navigate } from 'svelte-routing';
import { http } from '../http';

const URLS = {
  ACCOUNT: '/api/auth/account',
}


class AccountStore {
  account: Writable<Account>;

  constructor() {
    this.account = writable(new Account(undefined));
  };

  // getAccount to fetch this account
  getAccount = async () => {
    const { status, data } = await doFetch(URLS.ACCOUNT, 'GET');

    if (status !== http.STATUS_OK) {
      throw new Error('FAILED_TO_FETCH_ACCOUNT');
    }

    this.account.update(acc => {
      acc.name = data.name;
      acc.authenticated = true;
      return acc;
    });

    if (location.href.indexOf("login") > -1) {
      navigate('/jorisblomme');
    }
  }
}

export default new AccountStore()