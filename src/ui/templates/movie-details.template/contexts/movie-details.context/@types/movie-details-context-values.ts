export type MovieDetailsContextValues = {
	movieName: string

	isOpenCreateReviewModal: boolean
	setIsOpenCreateReviewModal: (value: boolean) => void
	closeCreateReviewModal: () => void
	openCreateReviewModal: () => void

	isOpenActionsMenu: boolean
	setIsOpenActionsMenu: (value: boolean) => void
	closeActionsMenu: () => void
	openActionsMenu: () => void
}
