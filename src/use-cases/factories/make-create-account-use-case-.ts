import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateAccountUseCase } from '../create-account'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createAccountUseCase = new CreateAccountUseCase(prismaUsersRepository)

  return createAccountUseCase
}
