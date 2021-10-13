import { Validation } from '@/presentation/controllers/signup/signup-protocols'
import { MissingParamError } from '../../../presentation/errors'
import { ValidationComposite } from './validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidationStub()
  const sut = new ValidationComposite([validationStub])

  return {
    sut,
    validationStub
  }
}

describe('RequiredFieldValidation', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const err = sut.validate({ field: 'any_value' })
    expect(err).toEqual(new MissingParamError('field'))
  })
})
