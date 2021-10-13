import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldToCompare')
}

describe('CompareFieldsValidation', () => {
  test('Should return a InvalidParamError if validations fails', () => {
    const sut = makeSut()
    const err = sut.validate({ field: 'any_value', fieldToCompare: 'any_field_to_compare' })
    expect(err).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not returns if validation succeeds', () => {
    const sut = makeSut()
    const err = sut.validate({ field: 'any_field', fieldToCompare: 'any_field' })
    expect(err).toBeFalsy()
  })
})
