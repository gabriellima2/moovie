import { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { ArrowLeft, ArrowUpLeft, SearchIcon, Mic } from 'lucide-react-native'
import { Link, useRouter } from 'expo-router'
import colors from 'tailwindcss/colors'

import { Typography } from '@/ui/atoms/typography'
import { Field } from '@/ui/components/field'

const history = [
	{ id: '1', value: 'scream' },
	{ id: '2', value: 'supernatural' },
	{ id: '3', value: 'saw' },
]

export default function Search() {
	const router = useRouter()
	const [search, setSearch] = useState('')

	function handleSearch(value?: string) {
		if (value) {
			setSearch(value)
		}
		router.push(`/movie/${(value || search).trim().toLowerCase()}`)
	}

	return (
		<View className="flex-1">
			<View className="flex-row items-center px-4">
				<Link href="/(tabs)/" asChild>
					<TouchableOpacity activeOpacity={0.6}>
						<ArrowLeft color={colors.black} />
					</TouchableOpacity>
				</Link>
				<Field.Root className="flex-1 ml-4">
					<Field.Input
						autoFocus
						value={search}
						onChangeText={setSearch}
						placeholder="Ex: Scream..."
						onSubmitEditing={() => handleSearch()}
						returnKeyType="search"
						keyboardType="web-search"
					/>
				</Field.Root>
				{!search && (
					<TouchableOpacity activeOpacity={0.6} className="ml-4">
						<Mic color={colors.black} />
					</TouchableOpacity>
				)}
			</View>
			<FlatList
				data={history}
				keyExtractor={({ id }) => id}
				contentContainerStyle={{ paddingBottom: 16 }}
				renderItem={({ item }) => (
					<TouchableOpacity
						activeOpacity={0.6}
						onPress={() => handleSearch(item.value)}
						className="flex-row items-center justify-between py-3 px-4"
					>
						<View className="flex-row items-center gap-x-4">
							<SearchIcon color={colors.black} size={20} />
							<Typography.Paragraph className="text-black">
								{item.value}
							</Typography.Paragraph>
						</View>
						<TouchableOpacity
							hitSlop={12}
							activeOpacity={0.6}
							onPress={() => setSearch(item.value)}
						>
							<ArrowUpLeft color={colors.black} size={20} />
						</TouchableOpacity>
					</TouchableOpacity>
				)}
			/>
		</View>
	)
}
