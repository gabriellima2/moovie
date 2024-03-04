import { CreateUserDTO } from '@/dtos/user.dtos/create-user.dto'
import { ProfileEntity } from '@/entities/profile.entity'

export interface UserRepository {
	create(params: CreateUserDTO): Promise<void>
	getByID(id: string): Promise<ProfileEntity | undefined>
}
