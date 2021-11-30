import { SurveyModel } from '../models/surveys'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add: (account: AddSurveyModel) => Promise<void>
}
