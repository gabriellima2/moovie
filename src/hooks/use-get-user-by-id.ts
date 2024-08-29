import { useQuery } from '@tanstack/react-query'
import { makeUserService } from '@/services/impl/user.service'
import { QUERY_KEYS } from '@/constants/keys'

const service = makeUserService()

export function useGetUserByID(id: string) {
	return useQuery({
		queryFn: () => service.getByID(id),
		queryKey: [QUERY_KEYS.GET_USER_BY_ID, id],
		throwOnError: true,
	})
}
