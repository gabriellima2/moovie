import { Unsubscribe } from 'firebase/auth'

import { UpdateProfileDTO } from '@/dtos/update-profile.dto'
import { UserEntity } from '@/entities/user.entity'
import { SignUpDTO } from '@/dtos/sign-up.dto'
import { SignInDTO } from '@/dtos/sign-in.dto'

export interface AuthenticationStoreProperties {
	user: UserEntity | null
	authStateHasBeenChecked: boolean
	signUp: (credentials: SignUpDTO) => Promise<void>
	signIn: (credentials: SignInDTO) => Promise<void>
	logout: () => Promise<void>
	anonymously: () => Promise<void>
	sendEmailVerification: () => Promise<void>
	sendPasswordReset: (email: string) => Promise<void>
	updateProfile: (params: UpdateProfileDTO) => Promise<void>
	checkAuthState: () => Unsubscribe
}
