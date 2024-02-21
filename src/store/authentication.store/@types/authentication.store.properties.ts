import { Unsubscribe } from 'firebase/auth'
import { UserEntity } from '@/entities/user.entity'

export interface AuthenticationStoreProperties {
	user: UserEntity | null
	authStateHasBeenChecked: boolean
	checkAuthState: () => Unsubscribe
}
