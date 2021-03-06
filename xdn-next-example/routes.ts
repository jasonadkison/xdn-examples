import { Router } from '@xdn/core/router'
import { nextRoutes } from '@xdn/next'
import getPrerenderRequests from './xdn/getPrerenderRequests'
import { SSR_CACHE_HANDLER, API_CACHE_HANDLER, NEXT_CACHE_HANDLER } from './xdn/cache'

export default new Router()
  /* @ts-ignore */
  .prerender(getPrerenderRequests)
  .match('/api/:path*', API_CACHE_HANDLER)
  .match('/category/:name', SSR_CACHE_HANDLER)
  .match('/product/:id', SSR_CACHE_HANDLER)
  .match('/_next/data/:build/category/:name.json', NEXT_CACHE_HANDLER)
  .match('/_next/data/:build/product/:id.json', NEXT_CACHE_HANDLER)
  .match('/service-worker.js', ({ serviceWorker }) => {
    return serviceWorker('.next/static/service-worker.js')
  })
  .use(nextRoutes) // automatically adds routes for all files under /pages
