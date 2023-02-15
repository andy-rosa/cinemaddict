interface ConfigSetting {
  url: string;
  method: string;
  body: null | string;
  headers: any;
}

export default abstract class ApiService {
  constructor(
    protected endPoint: string,
    protected authorization: string
  ) {}

  protected async load(config: ConfigSetting): Promise<any> {
    config.headers.append('Authorization', this.authorization);
    const {
      url,
      method,
      body,
      headers,
    } = config;

    const response = await fetch(
      `${this.endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  static checkStatus(response: any): never | void {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError(err: Error): never {
    throw err;
  }

  static parseResponse(response: any) {
    return response.json();
  }

}
