import { useLocalSearchParams } from 'expo-router'
import { Typography } from '@/ui/atoms/typography'

export default function CreateReview() {
	const { id } = useLocalSearchParams()
	return <Typography.Title>{id}</Typography.Title>
}
