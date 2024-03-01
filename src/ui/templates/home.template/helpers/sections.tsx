import { RecommendationsListPreview } from '@/ui/components/recommendations-list-preview'
import { ReviewPreview } from '@/ui/components/review-preview'

import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import { ReviewEntity } from '@/entities/review.entity'
import { MovieEntity } from '@/entities/movie.entity'

type Data = ReviewEntity | RecommendationsListEntity | MovieEntity

type Section = {
	title: string
	data: Data[]
	renderItem: (params: { item: Data }) => JSX.Element
}

export const sections: Section[] = [
	{
		title: 'Popular Lists',
		data: [
			{
				id: 'any_id',
				title: 'Best of Slasher Movies',
				user_id: 'any_user',
			},
		] as RecommendationsListEntity[],
		renderItem: ({ item }) => (
			<RecommendationsListPreview
				id={(item as RecommendationsListEntity).id}
				title={(item as RecommendationsListEntity).title}
				userID={(item as RecommendationsListEntity).user_id}
			/>
		),
	},
	{
		title: 'Last Reviews',
		data: [
			{
				id: 'any_id',
				rating: 4,
				movie_id: 'any_movie',
				user_id: 'any_id',
				description: 'any_description',
			},
		] as ReviewEntity[],
		renderItem: ({ item }) => (
			<ReviewPreview
				id={(item as ReviewEntity).id}
				description={(item as ReviewEntity).description}
				rating={(item as ReviewEntity).rating}
				userID={(item as ReviewEntity).user_id}
			/>
		),
	},
]
