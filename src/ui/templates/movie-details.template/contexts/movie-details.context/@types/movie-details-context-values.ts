export type MovieDetailsContextValues = {
	movieName: string

	isOpenCreateReviewModal: boolean
	setIsOpenCreateReviewModal: (value: boolean) => void
	closeCreateReviewModal: () => void
	openCreateReviewModal: () => void

	isOpenCreateListModal: boolean
	setIsOpenCreateListModal: (value: boolean) => void
	closeCreateListModal: () => void
	openCreateListModal: () => void

	isOpenAddToListModal: boolean
	setIsOpenAddToListModal: (value: boolean) => void
	closeAddToListModal: () => void
	openAddToListModal: () => void

	isOpenActionsMenu: boolean
	setIsOpenActionsMenu: (value: boolean) => void
	closeActionsMenu: () => void
	openActionsMenu: () => void
}
