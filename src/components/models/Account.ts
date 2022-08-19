import Validator, { IValidationObject } from '../validator/Validator';
import { Model } from './';

export interface IAccount {
  name: string
  email: string
  password: string
  authenticated: boolean
}

class Account extends Model {
  validation: IValidationObject;
  name: string;
  email: string;
  password: string;
  authenticated: boolean;

  constructor(data: IAccount | undefined) {
    super()

    this.name = data?.name || 'Marvin';
    this.email = data?.email || '';
    this.password = data?.password || '';
    this.authenticated = true;

    this.validation = {
      email: Validator.email('enter_a_valid_email'),
      password: Validator.password('enter_a_valid_password'),
    }

    Validator.initalize(this, this.validation)
  }
}

export default Account