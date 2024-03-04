import { useQuery } from '@tanstack/react-query'
import { makeUserRepositoryImpl } from '@/repositories/impl/user.repository.impl'

const repository = makeUserRepositoryImpl()

export function useGetUserByID(id: string) {
	return useQuery({
		queryFn: () => repository.getByID(id),
		queryKey: ['user-public-info', id],
	})
}
