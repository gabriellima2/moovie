import { useQuery } from '@tanstack/react-query'
import { makeUserService } from '@/services/impl/user.service'

const service = makeUserService()

export function useGetUserByID(id: string) {
	return useQuery({
		queryFn: () => service.getByID(id),
		queryKey: ['user-public-info', id],
		throwOnError: true,
	})
}
