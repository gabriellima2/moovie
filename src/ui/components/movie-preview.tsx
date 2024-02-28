import { View } from 'react-native'
import { Typography } from '../atoms/typography'

type MoviePreviewProps = {
	id: string
	banner: string
	title: string
}

export function MoviePreview(props: MoviePreviewProps) {
	const { title } = props
	return (
		<View>
			<Typography.Title>{title}</Typography.Title>
		</View>
	)
}
