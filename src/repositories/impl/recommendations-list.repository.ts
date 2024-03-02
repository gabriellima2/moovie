import { collection, getDocs } from 'firebase/firestore'

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
		const collectionRef = collection(db, this.collection)
		const querySnapshot = await getDocs(collectionRef)
		const lists = querySnapshot.docs.map(
			(doc) =>
				({
					id: doc.id,
					...doc.data(),
				}) as RecommendationsListEntity
		)
		return lists
	}
}

export const makeRecommendationsListRepository = () =>
	new RecommendationsListRepositoryImpl()
