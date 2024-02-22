import { Unsubscribe } from 'firebase/auth'

import { UserEntity } from '@/entities/user.entity'
import { SignUpDTO } from '@/dtos/sign-up.dto'
import { SignInDTO } from '@/dtos/sign-in.dto'

export interface AuthenticationStoreProperties {
	user: UserEntity | null
	authStateHasBeenChecked: boolean
	signUp: (credentials: SignUpDTO) => Promise<void>
	signIn: (credentials: SignInDTO) => Promise<void>
	anonymously: () => Promise<void>
	sendEmailVerification: () => Promise<void>
	sendPasswordReset: (email: string) => Promise<void>
	checkAuthState: () => Unsubscribe
}
