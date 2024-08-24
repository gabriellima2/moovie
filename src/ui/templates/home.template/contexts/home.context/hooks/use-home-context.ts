import { useContext } from 'react'
import { HomeContext } from '../home.context'

import { ContextWithoutProviderException } from '@/exceptions/context-without-provider.exception'

export function useHomeContext() {
	const context = useContext(HomeContext)
	if (!context) {
		throw new ContextWithoutProviderException('HomeContext', 'HomeProvider')
	}
	return context
}
