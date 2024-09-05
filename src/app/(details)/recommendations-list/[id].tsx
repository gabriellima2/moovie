import { useLocalSearchParams } from 'expo-router'
import RecommendationsListTemplate from '@/ui/templates/recommendations-list-details.template/recommendations-list-details.template'

export default function RecommendationsList() {
	const { id } = useLocalSearchParams()
	return <RecommendationsListTemplate id={id as string} />
}
