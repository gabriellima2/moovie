import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'

import { RecommendationsListPreview } from '@/ui/components/recommendations-list-preview'
import { ReviewPreview } from '@/ui/components/review-preview'
import { ErrorText } from '@/ui/atoms/error-text'
import { Section } from '@/ui/components/section'
import { Header } from '../components/header'

import { useGetPreview } from '@/hooks/use-get-preview'

import type { RecommendationsListEntity } from '@/entities/recommendations-list.entity'

export function HomeTemplate() {
	const [reviews, recommendations] = useGetPreview()
	const bottomTabHeight = useBottomTabBarHeight()
	return (
		<ScrollView
			contentContainerStyle={{ gap: 16, paddingBottom: bottomTabHeight - 16 }}
		>
			<Header.Root>
				<Header.Title>Let&apos;s start exploring</Header.Title>
				<Link href="/search" asChild>
					<Feather name="search" size={20} color="#000" />
				</Link>
			</Header.Root>
			<Section.Root className="px-0 mb-4">
				<Section.Title className="pl-4">Most Popular Lists</Section.Title>
				{recommendations.isLoading && (
					<ActivityIndicator className="self-center" />
				)}
				{recommendations.error && (
					<ErrorText text={recommendations.error.message} />
				)}
				{recommendations.data && (
					<FlatList<RecommendationsListEntity>
						contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
						horizontal
						showsHorizontalScrollIndicator={false}
						data={recommendations.data}
						keyExtractor={({ id }) => id}
						renderItem={({ item }) => (
							<RecommendationsListPreview
								id={item.id}
								title={item.title}
								userID={item.user_id}
								movieName={item.movies_name[0]}
							/>
						)}
					/>
				)}
			</Section.Root>
			<Section.Root>
				<Section.Title>Last Reviews</Section.Title>
				{reviews.isLoading && <ActivityIndicator className="self-center" />}
				{reviews.error && <ErrorText text={reviews.error.message} />}
				{reviews.data &&
					reviews.data.map((review) => (
						<View key={review.id} className="mb-4">
							<ReviewPreview
								id={review.id}
								movieName={review.movie_name}
								likes={review.likes_id}
								userID={review.user_id}
								description={review.description}
								rating={review.rating}
							/>
						</View>
					))}
			</Section.Root>
		</ScrollView>
	)
}
