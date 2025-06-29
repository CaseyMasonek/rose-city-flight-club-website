// User session payload
export type SessionPayload = {
    id: string,
    is_admin: boolean,
    expiresAt: Date,
}