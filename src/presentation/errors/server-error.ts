export class ServerError extends Error {
  constructor () {
    super('Internal server errro')
    this.name = 'ServerError'
  }
}
