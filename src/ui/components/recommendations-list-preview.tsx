import { Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

import { Typography } from '../atoms/typography'

type RecommendationsListPreviewProps = {
	id: string
	title: string
	imageUrl: string
	createdBy: string
}

export function RecommendationsListPreview(
	props: RecommendationsListPreviewProps
) {
	return (
		<Link href={`/recommendations-list/${props.id}`} asChild>
			<TouchableOpacity activeOpacity={0.8} className="w-[120px] gap-y-2">
				<Image
					source={{ uri: props.imageUrl }}
					className="w-full h-[170px] rounded-2xl"
				/>
				<Typography.Title className="text-base" numberOfLines={2}>
					{props.title}
				</Typography.Title>
				<Typography.Small>Created by {props.createdBy}</Typography.Small>
			</TouchableOpacity>
		</Link>
	)
}
