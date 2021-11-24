import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/surveys'

export class DbLoadSurveys implements LoadSurveys {
  private readonly loadSurveyRepository: LoadSurveysRepository

  constructor (loadSurveyRepository: LoadSurveysRepository) {
    this.loadSurveyRepository = loadSurveyRepository
  }

  async load (): Promise<SurveyModel[]> {
    await this.loadSurveyRepository.loadAll()
    return []
  }
}
