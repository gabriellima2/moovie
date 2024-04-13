import { TouchableOpacity, View } from 'react-native'
import { ChevronLeft, Mic } from 'lucide-react-native'
import colors from 'tailwindcss/colors'
import { Link } from 'expo-router'

import { SearchHistory } from '@/ui/components/search-history'
import { Typography } from '@/ui/atoms/typography'
import { Field } from '@/ui/components/field'

import { useSearchHistory } from './hooks/use-search-history'
import { useSearch } from './hooks/use-search'

export function SearchTemplate() {
	const { history, isLoading, update } = useSearchHistory()
	const { search, fillSearch, handleSearch } = useSearch({
		updateSearchHistoryStorage: update,
	})
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
				{!search && (
					<TouchableOpacity activeOpacity={0.6} className="ml-4">
						<Mic color={colors.black} />
					</TouchableOpacity>
				)}
			</View>
			{isLoading && <Typography.Small>Loading...</Typography.Small>}
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
