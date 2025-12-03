export const ROLES = ["user", "admin"] as const;
export type UserRoles = (typeof ROLES)[number];