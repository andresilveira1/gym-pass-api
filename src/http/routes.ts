import type { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account'
import { authenticate } from './controllers/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createAccount)
  app.post('/sessions', authenticate)
}
