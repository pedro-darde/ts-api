import { Validation } from '@/presentation/controllers/signup/signup-protocols'
import { MissingParamError } from '../../../presentation/errors'
import { ValidationComposite } from './validation-composite'

// const makeSut = (): ValidationComposite => {
//   return new ValidationComposite([new CompareFieldsValidation('', '')])
// }

describe('RequiredFieldValidation', () => {
  test('Should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const err = sut.validate({ field: 'any_value' })
    expect(err).toEqual(new MissingParamError('field'))
  })
})
