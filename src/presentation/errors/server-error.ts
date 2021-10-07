export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal server errro')
    this.name = 'ServerError'
    this.stack = stack
  }
}
