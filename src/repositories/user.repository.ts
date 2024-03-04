import { CreateUserDTO } from '@/dtos/user.dtos/create-user.dto'

export interface UserRepository {
	create(params: CreateUserDTO): Promise<void>
}
