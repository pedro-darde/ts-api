import { Authentication } from '../../../domain/usecases/authentication'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation } from './signup-controller-protocols'
import { EmailInUseError } from '../../errors'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation
  private readonly authentication: Authentication

  constructor (addAccount: AddAccount, validation: Validation, authentication: Authentication) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
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

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (e) {
      console.error(e)
      return serverError(e)
    }
  }
}
