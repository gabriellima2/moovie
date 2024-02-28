import { SectionList, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { RecommendationsListPreview } from '../components/recommendations-list-preview'
import { ReviewPreview } from '../components/review-preview'
import { MoviePreview } from '../components/movie-preview'
import { Typography } from '../atoms/typography'
import { Field } from '../components/field'

import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
import { ReviewEntity } from '@/entities/review.entity'
import { MovieEntity } from '@/entities/movie.entity'

type Data = ReviewEntity | RecommendationsListEntity | MovieEntity

type Section = {
	title: string
	data: Data[]
	renderItem: (params: { item: Data }) => JSX.Element
}

const DATA: Section[] = [
	{
		title: 'Popular Films',
		data: [
			{ id: 0, poster_path: 'any_image', title: 'Movie Title' },
		] as MovieEntity[],
		renderItem: ({ item }) => (
			<MoviePreview
				id={(item as MovieEntity).id.toString()}
				title={(item as MovieEntity).title}
				banner={(item as MovieEntity).poster_path}
			/>
		),
	},
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

export function HomeTemplate() {
	return (
		<SectionList
			ListHeaderComponent={() => (
				<Field.Root>
					<Field.Input />
					<TouchableOpacity>
						<Feather name="voicemail" size={20} color="000" />
					</TouchableOpacity>
				</Field.Root>
			)}
			sections={DATA}
			keyExtractor={(item) => (item as { id: string }).id}
			renderItem={({ section: { renderItem }, item }) => renderItem({ item })}
			renderSectionHeader={({ section: { title } }) => (
				<Typography.Title>{title}</Typography.Title>
			)}
		/>
	)
}
