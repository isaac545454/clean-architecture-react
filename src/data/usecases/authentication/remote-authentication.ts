import { Authentication, AuthenticationParams } from "@/Domain/usecases";
import { UnexpectedError, InvalidCredencialsError } from "@/Domain/error";
import { HttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { AccountModel } from "@/Domain/models";

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>
  ) { }

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const HttpResponse = await this.httpPostClient.post({ url: this.url, body: params });

    switch (HttpResponse.statusCode) {
      case HttpStatusCode.ok: return HttpResponse.body
      case HttpStatusCode.unauthorized: throw new InvalidCredencialsError()
      default: throw new UnexpectedError()
    }
  }
}
