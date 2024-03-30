import { Typography } from '@/ui/atoms/typography'
import { useLocalSearchParams } from 'expo-router'

export default function MovieDetails() {
	const { id } = useLocalSearchParams()
	return <Typography.Small>{id}</Typography.Small>
}
