import { apiFetch } from './api'

export interface RsvpPayload {
  name: string,
  attendance: 'yes' | 'no'
  guests: number
  message?: string
}

/** POST /api/rsvp — returns void (backend responds 201 or 204). */
export function submitRsvp(payload: RsvpPayload): Promise<void> {
  return apiFetch<void>('/api/rsvp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
