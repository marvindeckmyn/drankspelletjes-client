import Validator, { IValidationObject } from '../validator/Validator';
import { Model } from './';

export interface IAccount {
  email: string
  password: string
}

class Account extends Model {
  validation: IValidationObject;
  email: string;
  password: string;

  constructor(data: IAccount | undefined) {
    super()

    this.email = data?.email || '';
    this.password = data?.password || '';

    this.validation = {
      email: Validator.email('enter_a_valid_email'),
      password: Validator.password('enter_a_valid_password'),
    }

    Validator.initalize(this, this.validation)
  }
}

export default Account