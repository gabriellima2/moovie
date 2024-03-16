import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { db } from '@/lib/firebase'

import { RecommendationsListRepository } from '../recommendations-list.repository'
import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

class RecommendationsListRepositoryImpl
	implements RecommendationsListRepository
{
	private readonly collection: string
	constructor() {
		this.collection = 'recommendations_list'
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
}

export const makeRecommendationsListRepository = () =>
	new RecommendationsListRepositoryImpl()
