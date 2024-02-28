import { View } from 'react-native'
import { Typography } from '../atoms/typography'

type ReviewPreviewProps = {
	id: string
	userID: string
	rating: number
	description: string
}

export function ReviewPreview(props: ReviewPreviewProps) {
	const { description, rating } = props
	return (
		<View>
			<Typography.Small>Rating: {rating}</Typography.Small>
			<Typography.Paragraph>{description}</Typography.Paragraph>
		</View>
	)
}
