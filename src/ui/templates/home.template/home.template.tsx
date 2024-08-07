import { FlatList, ScrollView, View } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import { Link } from 'expo-router'

import { RecommendationsListPreviewSkeleton } from '@/ui/components/recommendations-list-preview-skeleton'
import { RecommendationsListPreview } from '@/ui/components/recommendations-list-preview'
import { ReviewReadMoreBottomSheet } from '@/ui/components/review-read-more-bottom-sheet'
import { ReviewPreviewSkeleton } from '@/ui/components/review-preview-skeleton'
import { ReviewPreview } from '@/ui/components/review-preview'
import { Section } from '@/ui/components/section'
import { Header } from '@/ui/components/header'

import { useReviewDetailsBottomSheetControl } from '@/hooks/use-review-details-bottom-sheet-control'
import { useHomeContext } from './contexts/home.context'

import type { RecommendationListDTO } from '@/dtos/recommendation-list.dto'

export function HomeTemplate() {
	const {
		reviewId,
		bottomSheetRef,
		dismissReviewDetailsBottomSheet,
		showReviewDetailsBottomSheet,
	} = useReviewDetailsBottomSheetControl()
	const bottomTabHeight = useBottomTabBarHeight()
	const { reviews, recommendations } = useHomeContext()
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
					<RecommendationsListPreviewSkeleton.List />
				)}
				{recommendations.data && (
					<FlatList<RecommendationListDTO>
						contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
						horizontal
						showsHorizontalScrollIndicator={false}
						data={recommendations.data}
						keyExtractor={({ id }) => id}
						renderItem={({ item }) => (
							<RecommendationsListPreview
								id={item.id}
								title={item.title}
								imageUrl={item.movie.Poster}
								createdBy={item.user.name}
							/>
						)}
					/>
				)}
			</Section.Root>
			<Section.Root>
				<Section.Title>Last Reviews</Section.Title>
				{reviews.isLoading && <ReviewPreviewSkeleton.List />}
				{reviews.data &&
					reviews.data.map((review) => (
						<View key={review.id} className="mb-4">
							<ReviewPreview
								id={review.id}
								title={review.movie.Title}
								imageUrl={review.movie.Poster}
								likes={review.likes_id}
								reviewBy={review.user.name}
								description={review.description}
								rating={review.rating}
								onPress={showReviewDetailsBottomSheet}
								highlighted
							/>
						</View>
					))}
			</Section.Root>
			<ReviewReadMoreBottomSheet
				id={reviewId}
				ref={bottomSheetRef}
				onDismiss={dismissReviewDetailsBottomSheet}
				onLike={reviews.refetch}
			/>
		</ScrollView>
	)
}
