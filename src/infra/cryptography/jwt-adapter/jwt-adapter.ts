import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt, { Secret } from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/criptography/decrypter'
export class JwtAdapter implements Encrypter,Decrypter {
  private readonly secret: Secret
  constructor (secret: Secret) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return token
  }

  async decrypt (value: string): Promise<string> {
    await jwt.verify(value, this.secret)
    return null
  }
}
