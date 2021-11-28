import { Collection } from 'mongodb'
import app from '../config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import jwt from 'jsonwebtoken'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = MongoHelper.getCollection('surveys')
    accountCollection = MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer1',
            image: 'https://image-name.com'
          }]
        }).expect(403)
    })

    test('Should return 204 with valid token', async () => {
      const { insertedId } = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        role: 'admin'
      })

      const token = jwt.sign({ id: insertedId }, env.jwtSecret)
      await accountCollection.updateOne({ _id: insertedId }, { $set: { accessToken: token } })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', token)
        .send({
          question: 'Question',
          answers: [{
            answer: 'Answer1',
            image: 'https://image-name.com'
          }]
        }).expect(204)
    })
  })
  describe('GET /surveys', () => {
    test('Should return 403 on load survey without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
      expect(403)
    })
  })
})
