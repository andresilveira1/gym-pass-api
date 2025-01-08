import type { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateAccountUseCaseRequest {
  name: string
  email: string
  password: string
}

export class CreateAccountUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateAccountUseCaseRequest) {
    const userEmailExists = await this.usersRepository.findByEmail(email)

    if (userEmailExists) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await hash(password, 6)

    await this.usersRepository.create({
      name,
      email,
      password_hash: hashedPassword,
    })
  }
}
