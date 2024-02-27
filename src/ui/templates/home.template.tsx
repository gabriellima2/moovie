import { SectionList, TouchableOpacity, View } from 'react-native'
import { Typography } from '../atoms/typography'
import { Field } from '../components/field'
import { Feather } from '@expo/vector-icons'
import { ReviewEntity } from '@/entities/review.entity'
import { RecommendationsListEntity } from '@/entities/recommendations-list.entity'
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
			<View>
				<Typography.Title>{(item as MovieEntity).title}</Typography.Title>
			</View>
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
			<View>
				<Typography.Title>
					{(item as RecommendationsListEntity).title}
				</Typography.Title>
			</View>
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
			<View>
				<Typography.Small>
					Rating: {(item as ReviewEntity).rating}
				</Typography.Small>
				<Typography.Paragraph>
					{(item as ReviewEntity).description}
				</Typography.Paragraph>
			</View>
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
