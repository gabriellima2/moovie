export class UserNotAuthenticatedException extends Error {
	constructor() {
		super('No user currently authenticated')
		this.name = 'UserNotAuthenticatedException'
	}
}
