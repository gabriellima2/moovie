import { UserService } from '../user.service'

import { makeUserRepository } from '@/repositories/impl/firebase/user.repository'

import { CreateUserDTO } from '@/dtos/user.dtos/create-user.dto'
import { UserRepository } from '@/repositories/user.repository'
import { ProfileEntity } from '@/entities/profile.entity'

class UserServiceImpl implements UserService {
	constructor(private readonly repository: UserRepository) {}
	async create(params: CreateUserDTO): Promise<void> {
		const { id, name } = params
		await this.repository.create({ id, name: name.toLowerCase().trim() })
	}
	async getByID(id: string): Promise<ProfileEntity> {
		const user = await this.repository.getByID(id)
		if (!user) throw new Error(`User with ${id} not found`)
		return user
	}
}

export const makeUserService = () => new UserServiceImpl(makeUserRepository())
