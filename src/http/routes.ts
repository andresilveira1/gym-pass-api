import type { FastifyInstance } from 'fastify'
import { createAccount } from './controllers/create-account'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', createAccount)
}
