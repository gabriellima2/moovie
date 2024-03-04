import { doc, setDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase'

import { CreateUserDTO } from '@/dtos/user.dtos/create-user.dto'
import { UserRepository } from '../user.repository'

class UserRepositoryImpl implements UserRepository {
	private readonly collection: string
	constructor() {
		this.collection = 'users'
	}
	async create(params: CreateUserDTO): Promise<void> {
		const { id, ...data } = params
		await setDoc(doc(db, this.collection, id), data)
	}
}

export const makeUserRepositoryImpl = () => new UserRepositoryImpl()
