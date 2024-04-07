export class MovieNotFoundException extends Error {
	constructor() {
		// eslint-disable-next-line prettier/prettier
		super('Unfortunately we couldn\'t find the movie you\'re looking for, try another one')
		this.name = 'MovieNotFoundException'
	}
}
