import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
describe('Jwt Adapter', () => {
  test('Should call sign with correct values ', async () => {
    const secret = 'secret'
    const sut = new JwtAdapter(secret)
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })
})
