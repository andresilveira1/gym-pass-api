import type { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import bcrypt from 'bcryptjs'
import type { User } from '@prisma/client'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

interface CreateAccountUseCaseResponse {
  user: User
}

export class CreateAccountUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const userEmailExists = await this.usersRepository.findByEmail(email)

    if (userEmailExists) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await bcrypt.hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    })

    return {
      user,
    }
  }
}
