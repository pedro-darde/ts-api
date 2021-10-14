import { badRequest, ok, serverError, unauthorized } from '../../../presentation/helpers/http-helper'
import { Validation } from '@/presentation/helpers/validators/validation'
import { HttpRequest, HttpResponse, Controller, Authentication } from './login-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation
  constructor (authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const err = this.validation.validate(httpRequest.body)
      if (err) {
        return badRequest(err)
      }
      const { email, password } = httpRequest.body

      const acessToken = await this.authentication.auth(email, password)

      if (!acessToken) {
        return unauthorized()
      }
      return ok({ accessToken: 'generated_token' })
    } catch (error) {
      return serverError(error)
    }
  }
}
