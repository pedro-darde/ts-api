import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validations fails', () => {
    const sut = makeSut()
    const err = sut.validate({ name: 'any_name' })
    expect(err).toEqual(new MissingParamError('field'))
  })

  test('Should not returns if validation succeeds', () => {
    const sut = makeSut()
    const err = sut.validate({ field: 'any_field' })
    expect(err).toBeFalsy()
  })
})
