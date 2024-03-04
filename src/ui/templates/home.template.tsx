import { ActivityIndicator, FlatList, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'

import { RecommendationsListPreview } from '@/ui/components/recommendations-list-preview'
import { ReviewPreview } from '@/ui/components/review-preview'
import { ErrorText } from '@/ui/atoms/error-text'
import { Section } from '@/ui/components/section'
import { Header } from '../components/header'

import { useGetPreview } from '@/hooks/use-get-preview'

export function HomeTemplate() {
	const [reviews, recommendations] = useGetPreview()
	return (
		<ScrollView>
			<Header.Root>
				<Header.Title>Let&apos;s start exploring</Header.Title>
				<Link href="/search" asChild>
					<Feather name="search" size={20} color="#000" />
				</Link>
			</Header.Root>
			<Section.Root className="px-0 pl-4 mb-4">
				<Section.Title>Most Popular Lists</Section.Title>
				{!recommendations.data &&
					recommendations.isLoading &&
					!recommendations.error && (
						<ActivityIndicator className="self-center" />
					)}
				{!recommendations.data &&
					!recommendations.isLoading &&
					recommendations.error && (
						<ErrorText text={recommendations.error.message} />
					)}
				{recommendations.data &&
					!recommendations.isLoading &&
					!recommendations.error && (
						<FlatList
							horizontal
							data={recommendations.data}
							keyExtractor={({ id }) => id}
							renderItem={({ item }) => (
								<RecommendationsListPreview
									id={item.id}
									title={item.title}
									userID={item.user_id}
								/>
							)}
						/>
					)}
			</Section.Root>
			<Section.Root>
				<Section.Title>Last Reviews</Section.Title>
				{!reviews.data && reviews.isLoading && !reviews.error && (
					<ActivityIndicator className="self-center" />
				)}
				{!reviews.data && !reviews.isLoading && reviews.error && (
					<ErrorText text={reviews.error.message} />
				)}
				{reviews.data &&
					!reviews.isLoading &&
					!reviews.error &&
					reviews.data.map((review) => (
						<ReviewPreview
							key={review.id}
							movieName={review.movie_name}
							likes={review.likes_id}
							userID={review.user_id}
							description={review.description}
							rating={review.rating}
						/>
					))}
			</Section.Root>
		</ScrollView>
	)
}
