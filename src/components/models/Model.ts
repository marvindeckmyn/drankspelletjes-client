import type { IErrorObject } from "../validator/Validator";
import { derived, writable, Writable } from "svelte/store";

class Model {
  errors: Writable<IErrorObject>

  constructor() {
    this.errors = writable({})
  }

  getActiveErrors = () => {
    return derived(this.errors, $errors => {
      const values = Object.values($errors);

      return values.reduce((errors, error) => {
        if (error.error) {
          errors.push(error)
        }

        return errors
      }, [])
    })
  }
}

export default Model
