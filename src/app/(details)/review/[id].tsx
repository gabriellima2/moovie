import { useLocalSearchParams } from 'expo-router'
import { Typography } from '@/ui/atoms/typography'

export default function Review() {
	const { id } = useLocalSearchParams()
	return <Typography.Label>Hello {id}</Typography.Label>
}
