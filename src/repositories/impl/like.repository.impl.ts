import {
	deleteDoc,
	doc,
	addDoc,
	collection,
	where,
	query,
	getDocs,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'

import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { GetLikeDTO } from '@/dtos/like.dtos/get-like.dto'
import { LikeEntity } from '@/entities/like.entity'
import { LikeRepository } from '../like.repository'

class LikeRepositoryImpl implements LikeRepository {
	private readonly collection: string
	constructor() {
		this.collection = 'like'
	}
	async create(params: CreateLikeDTO): Promise<LikeEntity> {
		const ref = collection(db, this.collection)
		const createdLike = await addDoc(ref, params)
		return { ...createdLike } as unknown as LikeEntity
	}
	async delete(id: string): Promise<void> {
		const ref = doc(db, this.collection, id)
		await deleteDoc(ref)
	}
	async getAllByDocumentID(id: string): Promise<LikeEntity[]> {
		const ref = collection(db, this.collection)
		const q = query(ref, where('document_id', '==', id))
		const snapshot = await getDocs(q)
		return snapshot.docs.map((doc) => ({
			...(doc.data() as LikeEntity),
			id: doc.id,
		}))
	}
	async get(params: GetLikeDTO): Promise<LikeEntity | undefined> {
		const { document_id, user_id } = params
		const ref = collection(db, this.collection)
		const q = query(
			ref,
			where('document_id', '==', document_id),
			where('user_id', '==', user_id)
		)
		const snapshot = await getDocs(q)
		const like = snapshot.docs.map((doc) => ({
			...(doc.data() as LikeEntity),
			id: doc.id,
		}))
		if (!like.length) return
		return like[0]
	}
}

export const makeLikeRepository = () => new LikeRepositoryImpl()
