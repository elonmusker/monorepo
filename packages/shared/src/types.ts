/** Environment configuration */
export interface AppConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isProduction: boolean;
}

/** Pagination parameters */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/** Paginated response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/** API response wrapper */
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/** User role for authorization */
export type UserRole = "user" | "admin" | "moderator";

/** Review form input (used in web, admin, and mobile) */
export interface ReviewFormInput {
  targetId: string;
  rating: number;
  comment: string;
}
