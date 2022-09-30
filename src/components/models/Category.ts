import Validator,  { IValidationObject } from '../validator/Validator'
import { Model } from './';

export interface ICategory {
  id: string;
  name: {[key: string]: string};
  description: {[key: string]: string};
  image: string;
  order: number;
}

class Category extends Model {
  id: string;
  validation: IValidationObject;
  name: {[key: string]: string};
  order: number;

  constructor(data: ICategory | undefined) {
    super();
    
    this.id = data?.id;
    this.name = data?.name || {};
    this.order = data?.order || 0;

    this.validation = {
      name: Validator.multiInput('enter_a_valid_name'),
    }

    Validator.initalize(this, this.validation)
  }
}

export default Category
