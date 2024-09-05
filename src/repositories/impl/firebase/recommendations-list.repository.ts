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

import { CreateRecommendationsListMapper } from '@/mappers/create-recommendations-list.mapper'
import { db } from '@/lib/firebase'

import { RecommendationsListRepository } from '../../recommendations-list.repository'
import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

import { CreateRecommendationListDTO } from '@/dtos/recommendation-list.dto'

class RecommendationsListRepositoryImpl
	implements RecommendationsListRepository
{
	private readonly collection: string
	constructor() {
		this.collection = 'recommendations_list'
	}
	async create(data: CreateRecommendationListDTO): Promise<void> {
		const raw = CreateRecommendationsListMapper.toFirebase(data)
		const ref = collection(db, this.collection)
		await addDoc(ref, raw)
	}
	async getAll(): Promise<RecommendationsListEntity[]> {
		const ref = collection(db, this.collection)
		const docSnap = await getDocs(ref)
		const lists = docSnap.docs.map(
			(doc) => ({ ...doc.data(), id: doc.id }) as RecommendationsListEntity
		)
		return lists
	}
	async getByID(id: string): Promise<RecommendationsListEntity | undefined> {
		const ref = doc(db, this.collection, id)
		const docSnap = await getDoc(ref)
		if (!docSnap.exists()) return
		return { ...(docSnap.data() as RecommendationsListEntity), id: docSnap.id }
	}
	async getByUser(
		userID: string
	): Promise<RecommendationsListEntity[] | undefined> {
		const ref = collection(db, this.collection)
		const q = query(ref, where('user_id', '==', userID))
		const snapshot = await getDocs(q)
		const reviews = snapshot.docs.map((doc) => ({
			...(doc.data() as RecommendationsListEntity),
			id: doc.id,
		}))
		return reviews
	}
	async append(document: string, movieName: string): Promise<void> {
		const ref = doc(db, this.collection, document)
		await updateDoc(ref, { movies_name: arrayUnion(movieName) })
	}
	async remove(document: string, movieName: string): Promise<void> {
		const ref = doc(db, this.collection, document)
		await updateDoc(ref, { movies_name: arrayRemove(movieName) })
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

export const makeRecommendationsListRepository = () =>
	new RecommendationsListRepositoryImpl()
