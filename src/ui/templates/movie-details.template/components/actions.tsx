import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { EllipsisVertical, ListPlus, Plus } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import colors from 'tailwindcss/colors'

import {
	BottomSheet,
	type BottomSheetProps,
} from '@/ui/components/bottom-sheet'
import { Typography } from '@/ui/atoms/typography'

export type TriggerProps = Omit<
	TouchableOpacityProps,
	'children' | 'accessibilityLabel'
>

export type MenuProps = Omit<BottomSheetProps, 'children'> & {
	name: string
}

function Trigger(props: TriggerProps) {
	return (
		<TouchableOpacity accessibilityLabel="Menu" activeOpacity={0.6} {...props}>
			<EllipsisVertical size={20} color={colors.black} />
		</TouchableOpacity>
	)
}

function Menu(props: MenuProps) {
	const router = useRouter()
	return (
		<BottomSheet {...props}>
			<Typography.Title className="mb-4 text-base text-center">
				{props.name}
			</Typography.Title>
			<TouchableOpacity
				onPress={() => router.push(`/recommendations-list/${props.name}`)}
				className="flex-row py-3"
				activeOpacity={0.6}
			>
				<Plus size={20} color={colors.black} className="mr-4" />
				<Typography.Label>Criar Review</Typography.Label>
			</TouchableOpacity>
			<TouchableOpacity className="flex-row py-3" activeOpacity={0.6}>
				<ListPlus size={20} color={colors.black} className="mr-4" />
				<Typography.Label>Adicionar à lista</Typography.Label>
			</TouchableOpacity>
		</BottomSheet>
	)
}

export const Actions = {
	Trigger,
	Menu,
}
