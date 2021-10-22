import { Encrypter } from '../../../data/protocols/criptography/encrypter'
import jwt, { Secret } from 'jsonwebtoken'
export class JwtAdapter implements Encrypter {
  private readonly secret: Secret
  constructor (secret: Secret) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    const token = jwt.sign({ id: value }, this.secret)
    return token
  }
}
