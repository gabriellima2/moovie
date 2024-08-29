import { useState } from 'react'
import { useRouter } from 'expo-router'

import { useSearchHistory } from './use-search-history'

export function useSearch() {
	const { history, isLoading, update } = useSearchHistory()
	const router = useRouter()
	const [search, setSearch] = useState('')

	async function handleSearch(value?: string) {
		if (value) {
			setSearch(value)
		}
		const searchBy = value || search
		if (!searchBy) return
		await update(searchBy)
		router.push(`/movie/${searchBy.trim().toLowerCase()}`)
	}

	return {
		history,
		isLoading,
		search,
		fillSearch: setSearch,
		handleSearch,
	}
}
