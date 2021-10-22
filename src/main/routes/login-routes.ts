import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSingUpController } from '../factories/signup/signup-factory'
import { makeLoginController } from '@/main/factories/login/login-factory'
export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSingUpController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', adaptRoute(makeLoginController()))
}
