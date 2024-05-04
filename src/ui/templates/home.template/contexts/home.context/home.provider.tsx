import { type PropsWithChildren } from 'react'

import { HomeContext } from './home.context'
import { useGetPreview } from '@/hooks/use-get-preview'

export function HomeProvider(props: PropsWithChildren) {
	const { children } = props
	const [reviews, recommendations] = useGetPreview()
	return (
		<HomeContext.Provider value={{ reviews, recommendations }}>
			{children}
		</HomeContext.Provider>
	)
}
