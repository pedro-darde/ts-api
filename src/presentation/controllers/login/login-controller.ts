import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'
import { HttpRequest, HttpResponse, Controller, Authentication } from './login-controller-protocols'

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

      const acessToken = await this.authentication.auth({
        email,
        password
      })

      if (!acessToken) {
        return unauthorized()
      }
      return ok({ accessToken: acessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
