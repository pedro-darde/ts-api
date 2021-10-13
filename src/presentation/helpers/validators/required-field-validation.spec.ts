import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validations fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const err = sut.validate({ name: 'any_name' })
    expect(err).toEqual(new MissingParamError('any_field'))
  })
})
