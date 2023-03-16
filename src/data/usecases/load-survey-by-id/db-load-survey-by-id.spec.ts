import { LoadSurveyByIdRepository } from "@/data/protocols/db/survey/load-survey-by-id-repository";
import { SurveyModel } from "@/domain/models/surveys";
import MockDate from "mockdate";
import { DbLoadSurveyById } from "./db-load-survey-by-id";

interface SutTypes {
  sut: DbLoadSurveyById;
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository;
}

const makeFakeSurvey = (): SurveyModel => ({
  id: "other_id",
  question: "other_question",
  answers: [
    {
      image: "other_image",
      answer: "other_answer",
    },
  ],
  date: new Date(),
});
const makeLoadSurveysRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyRepositoryByIdStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel> {
      return makeFakeSurvey();
    }
  }
  return new LoadSurveyRepositoryByIdStub();
};

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveysRepositoryStub();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);

  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe("DbLoadSurveyById", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });
  test("Should call LoadSurveyByIdRepository", async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, "loadById");
    await sut.loadById("any_id");
    expect(loadByIdSpy).toHaveBeenCalledWith("any_id");
  });
});
