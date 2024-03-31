export interface SearchHistoryService {
	getAll(): Promise<string[]>
	set(value: string): Promise<void>
}
