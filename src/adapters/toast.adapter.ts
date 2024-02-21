export interface ToastShowParams {
	type: 'error' | 'info' | 'success'
	position?: 'top' | 'bottom'
	title: string
	description?: string
	bottomOffset?: number
	keyboardOffset?: number
	onShow?: () => void
	onHide?: () => void
}

export interface ToastAdapter {
	show(params: ToastShowParams): void
}
