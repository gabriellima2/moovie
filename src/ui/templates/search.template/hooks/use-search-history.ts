import { useQuery } from '@tanstack/react-query'

import { makeSearchHistoryService } from '@/services/impl/search-history.service'
import { queryClient } from '@/lib/query-client'

import { KEYS } from '@/constants/keys'

const searchHistoryService = makeSearchHistoryService()

export function useSearchHistory() {
	const { data: history, isLoading } = useQuery({
		queryKey: [KEYS.SEARCH_HISTORY],
		queryFn: () => searchHistoryService.getAll(),
	})

	async function update(value: string) {
		await searchHistoryService.set(value.trim().toLowerCase())
		queryClient.invalidateQueries({ queryKey: [KEYS.SEARCH_HISTORY] })
	}

	return {
		history,
		isLoading,
		update,
	}
}
