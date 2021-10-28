import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation } from './signup-controller-protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const { email, password, name } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return ok(account)
    } catch (e) {
      console.error(e)
      return serverError(e)
    }
  }
}
