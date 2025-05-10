export class AuthError extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "AuthError";
    Object.setPrototypeOf(this, AuthError.prototype);
    window.location.reload();
  }
}
