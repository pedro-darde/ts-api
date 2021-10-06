import { Controller, HttpRequest } from '@/presentation/protocols'
import { Request, Response } from 'express'
export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
