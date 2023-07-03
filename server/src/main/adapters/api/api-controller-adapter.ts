import { type IMiddleware, type IController, type IRequest } from '@application/ports/presentation'
import { type Request as HttpRequest, type Response as HttpResponse } from 'express'

export const adaptController = (
  controller: IController,
  postControllerMiddleware?: IMiddleware
) => {
  return async (httpRequest: HttpRequest, httpResponse: HttpResponse) => {
    try {
      const request: IRequest = {
        body: httpRequest.body,
        parameters: httpRequest.params,
        query: httpRequest.query,
        headers: httpRequest.headers,
        controller: (httpRequest as IRequest).controller || undefined
      }

      const response = await controller.handle(request)

      await postControllerMiddleware?.handle(request, response)

      return httpResponse.status(response.statusCode).json(response.body)
    } catch (e) {
      return httpResponse.status(500).json({ error: 'Internal server error' })
    }
  }
}
