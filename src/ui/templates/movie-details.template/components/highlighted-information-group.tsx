import { View } from 'react-native'
import { Typography } from '@/ui/atoms/typography'

export type HighlightedInformationGroupProps = {
	label: string
	values: string | string[]
}

export function HighlightedInformationGroup(
	props: HighlightedInformationGroupProps
) {
	const { label, values } = props
	const isAnArrayOfValues = Array.isArray(values)
	return (
		<View className="flex-row gap-x-2 items-center flex-wrap mt-2">
			<Typography.Paragraph>{label}:</Typography.Paragraph>
			{isAnArrayOfValues ? (
				values.map((value) => (
					<Typography.Label key={value} className="bg-zinc-100 p-2 rounded-lg">
						{value.trim()}
					</Typography.Label>
				))
			) : (
				<Typography.Label className="bg-zinc-200 p-2 rounded-lg">
					{values.trim()}
				</Typography.Label>
			)}
		</View>
	)
}
