import { PropsWithChildren } from 'react'

import { MovieDetailsContext } from './movie-details.context'
import { useBoolean } from '@/hooks/use-boolean'
import { CreateReviewModal } from '../../components/create-review-modal'

type MovieDetailsProviderProps = PropsWithChildren & {
	movieName: string
}

export function MovieDetailsProvider(props: MovieDetailsProviderProps) {
	const { movieName, children } = props
	const {
		value: isOpenCreateReviewModal,
		setValue: setIsOpenCreateReviewModal,
		setFalse: closeCreateReviewModal,
		setTrue: openCreateReviewModal,
	} = useBoolean()
	const {
		value: isOpenActionsMenu,
		setValue: setIsOpenActionsMenu,
		setFalse: closeActionsMenu,
		setTrue: openActionsMenu,
	} = useBoolean()
	return (
		<MovieDetailsContext.Provider
			value={{
				movieName,

				isOpenCreateReviewModal,
				setIsOpenCreateReviewModal,
				closeCreateReviewModal,
				openCreateReviewModal,

				isOpenActionsMenu,
				setIsOpenActionsMenu,
				closeActionsMenu,
				openActionsMenu,
			}}
		>
			{children}
			<CreateReviewModal />
		</MovieDetailsContext.Provider>
	)
}
