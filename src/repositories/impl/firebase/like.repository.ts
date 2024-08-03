import {
	deleteDoc,
	doc,
	addDoc,
	collection,
	where,
	query,
	getDocs,
	getDoc,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'

import { CreateLikeDTO } from '@/dtos/like.dtos/create-like.dto'
import { GetLikeDTO } from '@/dtos/like.dtos/get-like.dto'

import { LikeRepository } from '../../like.repository'
import { LikeEntity } from '@/entities/like.entity'

class LikeRepositoryImpl implements LikeRepository {
	private readonly collection: string
	constructor() {
		this.collection = 'like'
	}
	async create(params: CreateLikeDTO): Promise<LikeEntity | undefined> {
		const ref = collection(db, this.collection)
		const doc = await addDoc(ref, { ...params, created_at: new Date() })
		const createdLike = await getDoc(doc)
		if (!createdLike.exists()) return
		return { ...(createdLike.data() as LikeEntity), id: createdLike.id }
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
