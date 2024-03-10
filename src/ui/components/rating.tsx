import { AirbnbRating } from 'react-native-ratings'

export type RatingProps = {
	value: number
	readonly?: boolean
	onFinishRating?: (rating: number) => void
}

export function Rating(props: RatingProps) {
	const { value, onFinishRating, readonly } = props
	return (
		<AirbnbRating
			count={5}
			defaultRating={value}
			size={16}
			selectedColor="#000000"
			showRating={false}
			isDisabled={readonly}
			onFinishRating={onFinishRating}
		/>
	)
}
