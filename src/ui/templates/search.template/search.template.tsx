import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { ChevronLeft } from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

import { SearchHistory } from '@/ui/components/search-history'
import { Field } from '@/ui/components/field'

import { useSearch } from './hooks/use-search'

export function SearchTemplate() {
	const { history, isLoading, search, fillSearch, handleSearch } = useSearch()
	return (
		<View className="flex-1">
			<View className="flex-row items-center px-4">
				<Link href="/(tabs)/" asChild>
					<TouchableOpacity activeOpacity={0.6}>
						<ChevronLeft size={24} color={colors.black} />
					</TouchableOpacity>
				</Link>
				<Field.Root className="flex-1 ml-4">
					<Field.Input
						autoFocus
						value={search}
						onChangeText={fillSearch}
						placeholder="Ex: Scream..."
						onSubmitEditing={() => handleSearch()}
						returnKeyType="search"
						keyboardType="web-search"
					/>
				</Field.Root>
			</View>
			{isLoading && (
				<View>
					<ActivityIndicator />
				</View>
			)}
			{history && (
				<SearchHistory
					data={history}
					handleSearch={handleSearch}
					handleSearchInputFill={fillSearch}
				/>
			)}
		</View>
	)
}
