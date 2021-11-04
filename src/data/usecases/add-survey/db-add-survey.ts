import { AddSurvey, AddSurveyModel } from '../../../domain/usecases/add-survey'
import { AddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  private readonly addSurveyRepository: AddSurveyRepository
  constructor (addSurveyRepository: AddSurveyRepository) {
    this.addSurveyRepository = addSurveyRepository
  }

  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
