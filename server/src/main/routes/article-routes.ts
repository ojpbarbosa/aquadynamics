import { adaptController, adaptMiddleware } from '@main/adapters'
import {
  createArticleControllerFactory,
  deleteArticleControllerFactory,
  findArticlesControllerFactory,
  setArticleStateControllerFactory,
  updateArticleControllerFactory
} from '@main/factories/controllers'
import { requireAuthenticationMiddlewareFactory } from '@main/factories/middlewares'
import { type Router } from 'express'

export const setUpArticleRoutes = (router: Router): void => {
  router.get('/articles', adaptController(findArticlesControllerFactory()))

  router.patch(
    '/articles/:id',
    adaptMiddleware(requireAuthenticationMiddlewareFactory(['manager', 'super'])),
    adaptController(updateArticleControllerFactory())
  )
  router.patch(
    '/articles/:id/state',
    adaptMiddleware(requireAuthenticationMiddlewareFactory(['manager', 'super'])),
    adaptController(setArticleStateControllerFactory())
  )

  router.post(
    '/articles',
    adaptMiddleware(requireAuthenticationMiddlewareFactory()),
    adaptController(createArticleControllerFactory())
  )

  router.delete(
    '/articles/:id',
    adaptMiddleware(requireAuthenticationMiddlewareFactory(['manager', 'super'])),
    adaptController(deleteArticleControllerFactory())
  )
}
