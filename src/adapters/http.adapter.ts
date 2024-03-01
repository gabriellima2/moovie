export interface HttpAdapter {
	get<R>(url: string): Promise<R>
}
