import { View } from 'react-native'
import { Typography } from '../atoms/typography'

type RecommendationsListPreviewProps = {
	id: string
	title: string
	userID: string
}

export function RecommendationsListPreview(
	props: RecommendationsListPreviewProps
) {
	const { title } = props
	return (
		<View>
			<Typography.Title>{title}</Typography.Title>
		</View>
	)
}
