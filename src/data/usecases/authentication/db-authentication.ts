import { Authentication, AuthenticationModel } from '@/domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { HashCompare } from '@/data/protocols/criptography/hash-compare'
import { TokenGenerator } from '@/data/protocols/criptography/token-generator'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly hashCompare: HashCompare
  private readonly tokenGenerator: TokenGenerator
  constructor (loadAccountByEmailRepository: LoadAccountByEmailRepository, hashCompare: HashCompare, tokenGenerator: TokenGenerator) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompare = hashCompare
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashCompare.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}
