import { type IController, type IRequest } from '@application/ports/presentation'
import { type Request as HttpRequest, type Response as HttpResponse } from 'express'

export const adaptController = (controller: IController) => {
  return async (httpRequest: HttpRequest, httpResponse: HttpResponse) => {
    try {
      const response = await controller.handle({
        parameters: httpRequest.params,
        query: httpRequest.query,
        headers: httpRequest.headers,
        body: httpRequest.body,
        device: (httpRequest as IRequest).device || undefined
      })

      return httpResponse.status(response.statusCode).json(response.body)
    } catch {
      return httpResponse.status(500).json({ error: 'Internal server error' })
    }
  }
}
