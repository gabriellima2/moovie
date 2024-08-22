import { PropsWithChildren } from 'react'

import { CreateReviewModal } from '../../components/create-review-modal'
import { CreateListModal } from '../../components/create-list-modal'
import { AddToListModal } from '../../components/add-to-list-modal'
import { MovieDetailsContext } from './movie-details.context'

import { useBoolean } from '@/hooks/use-boolean'

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
		value: isOpenCreateListModal,
		setValue: setIsOpenCreateListModal,
		setFalse: closeCreateListModal,
		setTrue: openCreateListModal,
	} = useBoolean()
	const {
		value: isOpenActionsMenu,
		setValue: setIsOpenActionsMenu,
		setFalse: closeActionsMenu,
		setTrue: openActionsMenu,
	} = useBoolean()
	const {
		value: isOpenAddToListModal,
		setValue: setIsOpenAddToListModal,
		setFalse: closeAddToListModal,
		setTrue: openAddToListModal,
	} = useBoolean()
	return (
		<MovieDetailsContext.Provider
			value={{
				movieName,

				isOpenCreateReviewModal,
				setIsOpenCreateReviewModal,
				closeCreateReviewModal,
				openCreateReviewModal,

				isOpenCreateListModal,
				setIsOpenCreateListModal,
				closeCreateListModal,
				openCreateListModal,

				isOpenAddToListModal,
				setIsOpenAddToListModal,
				closeAddToListModal,
				openAddToListModal,

				isOpenActionsMenu,
				setIsOpenActionsMenu,
				closeActionsMenu,
				openActionsMenu,
			}}
		>
			{children}
			{isOpenCreateReviewModal && <CreateReviewModal />}
			{isOpenAddToListModal && <AddToListModal />}
			{isOpenCreateListModal && <CreateListModal />}
		</MovieDetailsContext.Provider>
	)
}
