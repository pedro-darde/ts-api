import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  },
  async verify (token: string): Promise<string> {
    return await new Promise(resolve => resolve('any_value'))
  }
}))

const makeSut = (): JwtAdapter => {
  const secret = 'secret'
  return new JwtAdapter(secret)
}

describe('Jwt Adapter', () => {
  describe('encrypt()', () => {
    test('Should call sign with correct values ', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
    })

    test('Should return a token on sign success ', async () => {
      const sut = makeSut()
      const token = await sut.encrypt('any_value')
      expect(token).toBe('any_token')
    })

    test('Should throw if sign throws ', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
  describe('verify()', () => {
    test('Should call verify values ', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
    })
  })
})
