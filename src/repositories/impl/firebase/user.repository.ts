import { doc, getDoc, setDoc } from 'firebase/firestore'

import { db } from '@/lib/firebase'

import { UserNotFoundException } from '@/exceptions/user-not-found.exception'

import { CreateUserDTO } from '@/dtos/user.dtos/create-user.dto'
import { ProfileEntity } from '@/entities/profile.entity'
import { UserRepository } from '../../user.repository'

class UserRepositoryImpl implements UserRepository {
	private readonly collection: string
	constructor() {
		this.collection = 'users'
	}
	async create(params: CreateUserDTO): Promise<void> {
		const { id, ...data } = params
		const collectionRef = doc(db, this.collection, id)
		await setDoc(collectionRef, data)
	}
	async getByID(id: string): Promise<ProfileEntity | undefined> {
		const collectionRef = doc(db, this.collection, id)
		const docSnap = await getDoc(collectionRef)
		if (!docSnap.exists()) throw new UserNotFoundException()
		return { ...docSnap.data(), id: docSnap.id } as ProfileEntity
	}
}

export const makeUserRepository = () => new UserRepositoryImpl()
