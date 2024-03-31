import { useState } from 'react'
import { useRouter } from 'expo-router'

export type UseSearchParams = {
	updateSearchHistoryStorage: (value: string) => Promise<void>
}

export function useSearch(params: UseSearchParams) {
	const { updateSearchHistoryStorage } = params
	const router = useRouter()
	const [search, setSearch] = useState('')

	async function handleSearch(value?: string) {
		if (value) {
			setSearch(value)
		}
		const searchBy = value || search
		if (!searchBy) return
		await updateSearchHistoryStorage(searchBy)
		router.push(`/movie/${searchBy.trim().toLowerCase()}`)
	}

	return {
		search,
		fillSearch: setSearch,
		handleSearch,
	}
}
