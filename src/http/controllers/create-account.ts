import type { FastifyReply, FastifyRequest } from 'fastify'
import * as zod from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-create-account-use-case-'

const registerBodySchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  password: zod.string().min(6),
})

export async function createAccount(req: FastifyRequest, reply: FastifyReply) {
  const { name, email, password } = registerBodySchema.parse(req.body)

  try {
    const createAccountUseCase = makeRegisterUseCase()

    await createAccountUseCase.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
