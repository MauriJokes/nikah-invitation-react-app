import { apiFetch } from './api'

export interface Greeting {
  id: string
  name: string
  message: string
}

export interface NewGreetingPayload {
  name: string
  message: string
}

/** GET /api/greetings — returns array ordered newest-first. */
export function fetchGreetings(): Promise<Greeting[]> {
  return apiFetch<Greeting[]>('/api/greetings')
}

/** POST /api/greetings — returns the created greeting with server-assigned id. */
export function submitGreeting(payload: NewGreetingPayload): Promise<Greeting> {
  return apiFetch<Greeting>('/api/greetings', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
