import { CreateBotRequest } from './CreateBotRequest';
import { ExecuteBotRequest } from './ExecuteBotRequest';
import { ExecuteBotResponse } from './ExecuteBotResponse';
import { UpdateBotRequest } from './UpdateBotRequest';

export class ApiClient {
  public static async createbot(request: CreateBotRequest): Promise<string> {
    const result = await httpRequest('/api/bots', {
      method: 'POST',
      body: JSON.stringify(request)
    });
    return result['id'];
  }

  public static async updatebot(id: string, request: UpdateBotRequest): Promise<void> {
    await httpRequest(`/api/bots/${id}`, {
      method: 'PUT',
      body: JSON.stringify(request)
    });
  }

  public static async deletebot(id: string): Promise<void> {
    await httpRequest(`/api/bots/${id}`, {
      method: 'DELETE'
    });
  }

  public static async executebot(url: string, request: ExecuteBotRequest): Promise<ExecuteBotResponse> {
    return await httpRequest(`/api/functions/${url}`, {
      method: 'POST',
      body: JSON.stringify(request)
    });
  }
}

async function httpRequest(url: string, options: RequestInit): Promise<any> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status !== 200) {
    let error: string | null = null;
    try {
      const json = await response.json();
      if (typeof json === 'object' && json['error']) {
        error = json['error'];
      } else if (typeof json === 'string') {
        error = json;
      }
    } catch (e) {}
    throw new Error(error || 'Unknown error');
  }

  return await response.json();
}
