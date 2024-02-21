import { useState } from 'react'

type UseToggleParams = {
	initialValue?: boolean
}

export function useToggle(params?: UseToggleParams) {
	const [isActive, setIsActive] = useState(!!params?.initialValue)
	return { isActive, toggle: () => setIsActive((prevState) => !prevState) }
}
