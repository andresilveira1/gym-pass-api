import type { FastifyReply, FastifyRequest } from 'fastify'
import * as zod from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

const authenticateBodySchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(6),
})

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(200).send()
}
