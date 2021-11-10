import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSingUpController } from '../factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login/login-controller-factory'
export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/signup', adaptRoute(makeSingUpController()))
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', adaptRoute(makeLoginController()))
}
