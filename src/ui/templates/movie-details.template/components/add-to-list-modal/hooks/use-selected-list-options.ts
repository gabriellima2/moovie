import { useState } from 'react'

export function useSelectedListOptions() {
	const [selectedListOptions, setSelectedListOptions] = useState<string[]>([])

	function handleSelectedListOptionsChange(id: string, checked: boolean) {
		if (checked) {
			setSelectedListOptions((prevState) => [...prevState, id])
			return
		}
		setSelectedListOptions((prevState) =>
			prevState.filter((item) => item !== id)
		)
	}

	return {
		selectedListOptions,
		handleSelectedListOptionsChange,
	}
}
