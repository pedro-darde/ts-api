import { Hasher } from '@/data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
import { HashCompare } from '@/data/protocols/criptography/hash-compare'
export class BcryptAdapter implements Hasher, HashCompare {
  private readonly salt: number
  constructor (salt: number) {
    this.salt = salt
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (password: string, hashedPassword: string): Promise<boolean> {
    const isValid = await bcrypt.compare(password, hashedPassword)
    return isValid
  }
}
