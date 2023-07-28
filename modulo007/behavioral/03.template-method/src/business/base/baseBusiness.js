import { NotImplementedException } from "../../utils/exceptions.js";
export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name);
  }
  _create(data) {
    throw new NotImplementedException(this._create.name);
  }

  /* 
        Padrao de Martin Fowler
        a proposta do padrao é garantir um fluxo de métodos, definindo uma sequencia a ser
        executada

        esse create é a implementacao efetiva do template method
    */
  create(data) {
    const isValid = this._validateRequiredFields(data);
    if (!isValid) throw new Error(`invalid data!`);

    return this._create(data);
  }
}
