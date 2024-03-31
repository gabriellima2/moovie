import { FlatList } from 'react-native'

import { SearchHistoryItem } from './components/search-history-item'

export type SearchHistory = {
	data: string[]
	handleSearch: (value?: string) => void
	handleSearchInputFill: (value: string) => void
}

export function SearchHistory(props: SearchHistory) {
	const { data, handleSearch, handleSearchInputFill } = props
	return (
		<FlatList
			data={data}
			keyExtractor={(item, index) => `${item}-${index}`}
			contentContainerStyle={{ paddingBottom: 16 }}
			renderItem={({ item }) => (
				<SearchHistoryItem
					value={item}
					onPress={handleSearch}
					onFillPress={handleSearchInputFill}
				/>
			)}
		/>
	)
}
