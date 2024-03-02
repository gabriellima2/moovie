import { collection, getDocs } from 'firebase/firestore'

import { db } from '@/lib/firebase'

import { ReviewEntity } from '@/entities/review.entity'
import { ReviewRepository } from '../review.repository'

class ReviewRepositoryImpl implements ReviewRepository {
	private readonly collection: string
	constructor() {
		this.collection = 'review'
	}
	async getAll(): Promise<ReviewEntity[]> {
		const collectionRef = collection(db, this.collection)
		const querySnapshot = await getDocs(collectionRef)
		const reviews = querySnapshot.docs.map(
			(doc) =>
				({
					id: doc.id,
					...doc.data(),
				}) as ReviewEntity
		)
		return reviews
	}
}

export const makeReviewRepository = () => new ReviewRepositoryImpl()
