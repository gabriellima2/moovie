import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore'

import { CreateReviewMapper } from '../../../mappers/create-review.mapper'
import { db } from '@/lib/firebase'

import { ReviewRepository } from '../../review.repository'
import { ReviewEntity } from '@/entities/review.entity'

import { CreateReviewDTO } from '@/dtos/review.dto'

class ReviewRepositoryImpl implements ReviewRepository {
	private readonly collection: string
	constructor() {
		this.collection = 'review'
	}
	async create(data: CreateReviewDTO): Promise<void> {
		const raw = CreateReviewMapper.toFirebase(data)
		const ref = collection(db, this.collection)
		await addDoc(ref, raw)
	}
	async getAll(): Promise<ReviewEntity[]> {
		const ref = collection(db, this.collection)
		const docSnap = await getDocs(ref)
		const reviews = docSnap.docs.map(
			(doc) => ({ ...doc.data(), id: doc.id }) as ReviewEntity
		)
		return reviews
	}
	async getByID(id: string): Promise<ReviewEntity | undefined> {
		const ref = doc(db, this.collection, id)
		const docSnap = await getDoc(ref)
		if (!docSnap.exists()) return
		return { ...(docSnap.data() as ReviewEntity), id: docSnap.id }
	}
	async getByName(name: string): Promise<ReviewEntity[] | undefined> {
		const ref = collection(db, this.collection)
		const q = query(ref, where('movie_name', '==', name))
		const snapshot = await getDocs(q)
		const reviews = snapshot.docs.map((doc) => ({
			...(doc.data() as ReviewEntity),
			id: doc.id,
		}))
		return reviews
	}
	async getByUser(userID: string): Promise<ReviewEntity[] | undefined> {
		const ref = collection(db, this.collection)
		const q = query(ref, where('user_id', '==', userID))
		const snapshot = await getDocs(q)
		const reviews = snapshot.docs.map((doc) => ({
			...(doc.data() as ReviewEntity),
			id: doc.id,
		}))
		return reviews
	}
	async addLike(id: string, document: string): Promise<void> {
		const ref = doc(db, this.collection, document)
		await updateDoc(ref, { likes_id: arrayUnion(id) })
	}
	async deleteLike(id: string, document: string): Promise<void> {
		const ref = doc(db, this.collection, document)
		await updateDoc(ref, { likes_id: arrayRemove(id) })
	}
}

export const makeReviewRepository = () => new ReviewRepositoryImpl()
