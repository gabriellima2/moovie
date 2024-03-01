import { SectionList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'

import { RecommendationsListPreview } from '../components/recommendations-list-preview'
import { ReviewPreview } from '../components/review-preview'
import { Typography } from '../atoms/typography'
import { Header } from '../components/header'

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
				<Header.Root>
					<Header.Title>Let&apos;s start exploring</Header.Title>
					<Link href="/search" asChild>
						<Feather name="search" size={20} color="#000" />
					</Link>
				</Header.Root>
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
