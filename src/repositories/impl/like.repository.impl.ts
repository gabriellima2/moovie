import { deleteDoc, doc, addDoc, collection } from 'firebase/firestore'

import { db } from '@/lib/firebase'

import { CreateLikeDTO } from '@/dtos/create-like.dto'
import { LikeRepository } from '../like.repository'
import { LikeEntity } from '@/entities/like.entity'

class LikeRepositoryImpl implements LikeRepository {
	private readonly collection: string
	constructor() {
		this.collection = 'like'
	}
	async create(params: CreateLikeDTO): Promise<LikeEntity> {
		const ref = collection(db, this.collection)
		const createdLike = await addDoc(ref, params)
		return {
			...createdLike,
		} as unknown as LikeEntity
	}
	async delete(id: string): Promise<void> {
		const ref = doc(db, this.collection, id)
		await deleteDoc(ref)
	}
}

export const makeLikeRepository = () => new LikeRepositoryImpl()
