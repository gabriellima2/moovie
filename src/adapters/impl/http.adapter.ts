import { http } from '@/lib/http'
import { HttpAdapter } from '../http.adapter'

class HttpAdapterImpl implements HttpAdapter {
	async get<R>(url: string): Promise<R> {
		const { data, status } = await http.get<R>(url)
		if (status !== 200) throw new Error(`Request returned with code: ${status}`)
		return data
	}
}

export const makeHttpAdapter = () => new HttpAdapterImpl()
