import { useState } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { ArrowLeft, ArrowUpLeft, SearchIcon, Mic } from 'lucide-react-native'
import { useQuery } from '@tanstack/react-query'
import { Link, useRouter } from 'expo-router'
import colors from 'tailwindcss/colors'

import { Typography } from '@/ui/atoms/typography'
import { Field } from '@/ui/components/field'

import { makeStorageAdapter } from '@/adapters/impl/storage.adapter'
import { queryClient } from '@/lib/query-client'

const storage = makeStorageAdapter()

async function get(): Promise<string[]> {
	const data = await storage.get('moovie.search-history')
	if (!data) return []
	return JSON.parse(data)
}

export default function Search() {
	const router = useRouter()
	const [search, setSearch] = useState('')
	const { data: history, isLoading } = useQuery<string[]>({
		queryKey: ['moovie.search-history'],
		queryFn: () => get(),
	})

	function handleSearch(value?: string) {
		if (value) {
			setSearch(value)
		}
		const searchBy = value || search
		storage.set(
			'moovie.search-history',
			JSON.stringify(history ? [...history, searchBy] : [searchBy])
		)
		router.push(`/movie/${(searchBy || search).trim().toLowerCase()}`)
		queryClient.invalidateQueries({ queryKey: ['moovie.search-history'] })
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
			{isLoading && <Typography.Small>Loading...</Typography.Small>}
			{history && (
				<FlatList
					data={history}
					keyExtractor={(item, index) => `${item}-${index}`}
					contentContainerStyle={{ paddingBottom: 16 }}
					renderItem={({ item }) => (
						<TouchableOpacity
							activeOpacity={0.6}
							onPress={() => handleSearch(item)}
							className="flex-row items-center justify-between py-3 px-4"
						>
							<View className="flex-row items-center gap-x-4">
								<SearchIcon color={colors.black} size={20} />
								<Typography.Paragraph className="text-black">
									{item}
								</Typography.Paragraph>
							</View>
							<TouchableOpacity
								hitSlop={12}
								activeOpacity={0.6}
								onPress={() => setSearch(item)}
							>
								<ArrowUpLeft color={colors.black} size={20} />
							</TouchableOpacity>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	)
}
