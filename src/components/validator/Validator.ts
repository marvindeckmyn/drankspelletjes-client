export interface IValidationObject {
  [key: string]: (input: any) => { message: string, error: boolean }
}

export interface IErrorObject {
    [key: string]: { message: string, error: boolean } 
}


class Validator {
  static password = (message = 'enter_a_stronger_password') => {
    return (password: string) => {
      return {
        message: message,
        error: password.length < 8,
      };
    }
  };

  static input = (message = 'cannot_be_empty') => {
    return (input: string) => {
      return {
        message: message,
        error: input === '',
      }
    }
  };


  static email = (message = "should_be_a_valid_email") => {
    return (email: string) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return {
        message: message,
        error: !re.test(String(email).toLowerCase()),
      };
    }
  }

  static initalize = (objectToValidate: any, validationObject: IValidationObject) => {
    const keys = Object.keys(validationObject);

    keys.forEach((key: string) => {
      objectToValidate.errors.update((errors: IValidationObject[]) => {
        errors[key] = {
          message: "",
          error: false,
        }

        return errors
      })
    })
  }


  static validateKey = async (objectToValidate: any, key: string, validationObject?: IValidationObject) => {
    if (validationObject === undefined) {
      if (objectToValidate.validation === undefined) {
        throw new Error('INVALID_VALIDATION_OBJECT_FOUND')
      }

      validationObject = objectToValidate.validation
    }


    const valueToValidate = objectToValidate[key];
    const validationFunc = validationObject[key]
    if (validationFunc !== undefined) {
      const res = validationFunc(valueToValidate);

      objectToValidate.errors.update((errors: IValidationObject[]) => {
        errors[key] = res;
        return errors;
      })
    }
  }
  
  static validate = async (objectToValidate: any, validationObject?: IValidationObject) => {
    if (validationObject === undefined) {
      if (objectToValidate.validation === undefined) {
        throw new Error('INVALID_VALIDATION_OBJECT_FOUND')
      }

      validationObject = objectToValidate.validation
    }

    const keys = Object.keys(validationObject);
    const values = Object.values(validationObject)

    let hasErrors = false;

    keys.forEach(async (key: string, idx: number) => {
      
      const validationFunc = values[idx];
      if (validationFunc === undefined) {
        throw new Error('INVALID_VALIDATION_FUNCTION_FOUND')
      }

      const valueToValidate = objectToValidate[key];
      const res = validationFunc(valueToValidate);

      if (res.error) {
        hasErrors = true
      }

      objectToValidate.errors.update(errors => {
        errors[key] = res;
        return errors;
      })
    })

    if (hasErrors) {
      throw new Error('One or more parameter were invalid')
    }
  }
}

export default Validator
