import { Unsubscribe } from 'firebase/auth'

import { UserEntity } from '@/entities/user.entity'
import { SignUpDTO } from '@/dtos/sign-up.dto'

export interface AuthenticationStoreProperties {
	user: UserEntity | null
	authStateHasBeenChecked: boolean
	signUp: (credentials: SignUpDTO) => Promise<void>
	anonymously: () => Promise<void>
	sendEmailVerification: () => Promise<void>
	checkAuthState: () => Unsubscribe
}
