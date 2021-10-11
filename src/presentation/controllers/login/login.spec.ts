import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import { HttpRequest } from '@/presentation/protocols'
import { LoginController } from './login'

describe('Login Controller', () => {
  test('Should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest: HttpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
