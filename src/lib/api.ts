// ============================================
// Spiveql API Client v3
// ============================================

const API_BASE = import.meta.env.VITE_API_URL || "/api";

interface ApiOptions {
  method?: string;
  body?: unknown;
  token?: string;
}

export async function api<T = unknown>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, token } = options;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const storedToken = localStorage.getItem("spiveql_token");
  const finalToken = token || storedToken;

  if (finalToken) {
    headers["Authorization"] = `Bearer ${finalToken}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data as T;
}

// ============================================
// Auth
// ============================================
export const authApi = {
  register: (name: string, email: string, password: string) =>
    api<{ message: string; user_id: number; requires_verification: boolean }>("/register.php", {
      method: "POST",
      body: { name, email, password },
    }),

  verifyOtp: (userId: number, otp: string) =>
    api<{ token: string; user: AuthUser }>("/verify-otp.php", {
      method: "POST",
      body: { user_id: userId, otp },
    }),

  login: (email: string, password: string) =>
    api<{ token: string; user: AuthUser }>("/login.php", {
      method: "POST",
      body: { email, password },
    }),
};

// ============================================
// User
// ============================================
export const userApi = {
  getProfile: (token: string) =>
    api<{ user: UserProfile; projects: UserProject[]; progress: ProgressStats }>(
      "/user.php",
      { token }
    ),

  getProjects: (token: string, page = 1, limit = 10) =>
    api<{ projects: ProjectWithAccess[]; pagination: Pagination }>(
      `/projects.php?page=${page}&limit=${limit}`,
      { token }
    ),

  getTasks: (token: string, projectId: number) =>
    api<{ tasks: Task[] }>(`/tasks.php?project_id=${projectId}`, { token }),

  updateTaskProgress: (token: string, taskId: number, status: string) =>
    api("/tasks.php", {
      method: "PUT",
      token,
      body: { task_id: taskId, status },
    }),
};

// ============================================
// Public
// ============================================
export const publicApi = {
  getProjects: (page = 1, limit = 4) =>
    api<{ projects: PublicProject[]; pagination: Pagination }>(
      `/projects.php?public=1&page=${page}&limit=${limit}`
    ),

  getTestimonials: (page = 1, limit = 10) =>
    api<{ testimonials: Testimonial[]; pagination: Pagination }>(
      `/testimonials.php?page=${page}&limit=${limit}`
    ),
};

// ============================================
// Admin
// ============================================
export const adminApi = {
  getUsers: (token: string, page = 1, limit = 25, search = "") =>
    api<{ users: AdminUser[]; pagination: Pagination }>(
      `/admin/users.php?page=${page}&limit=${limit}${search ? `&search=${encodeURIComponent(search)}` : ""}`,
      { token }
    ),

  updateUser: (token: string, userId: number, action: string, extra?: Record<string, unknown>) =>
    api("/admin/update-user.php", {
      method: "PUT",
      token,
      body: { user_id: userId, action, ...extra },
    }),

  getProjects: (token: string) =>
    api<{ projects: AdminProject[] }>("/admin/projects.php", { token }),

  createProject: (token: string, data: Record<string, unknown>) =>
    api("/admin/projects.php", { method: "POST", token, body: data }),

  updateProject: (token: string, data: Record<string, unknown>) =>
    api("/admin/projects.php", { method: "PUT", token, body: data }),

  deleteProject: (token: string, projectId: number) =>
    api("/admin/projects.php", { method: "DELETE", token, body: { project_id: projectId } }),

  getTasks: (token: string, projectId: number) =>
    api<{ tasks: AdminTask[] }>(`/admin/tasks.php?project_id=${projectId}`, { token }),

  getAllTasks: (token: string) =>
    api<{ tasks: AdminTask[] }>("/admin/tasks.php?all=1", { token }),

  createTask: (token: string, data: Record<string, unknown>) =>
    api("/admin/tasks.php", { method: "POST", token, body: data }),

  updateTask: (token: string, data: Record<string, unknown>) =>
    api("/admin/tasks.php", { method: "PUT", token, body: data }),

  deleteTask: (token: string, taskId: number) =>
    api("/admin/tasks.php", { method: "DELETE", token, body: { task_id: taskId } }),

  getTestimonials: (token: string) =>
    api<{ testimonials: AdminTestimonial[] }>("/admin/testimonials.php", { token }),

  createTestimonial: (token: string, data: Record<string, unknown>) =>
    api("/admin/testimonials.php", { method: "POST", token, body: data }),

  updateTestimonial: (token: string, data: Record<string, unknown>) =>
    api("/admin/testimonials.php", { method: "PUT", token, body: data }),

  deleteTestimonial: (token: string, id: number) =>
    api("/admin/testimonials.php", { method: "DELETE", token, body: { id } }),

  // User-specific project & task endpoints
  getUserProjects: (token: string, userId: number) =>
    api<{ projects: UserProjectDetail[] }>(`/admin/user-projects.php?user_id=${userId}`, { token }),

  getUserTasks: (token: string, userId: number) =>
    api<{ tasks: UserTaskDetail[] }>(`/admin/user-tasks.php?user_id=${userId}`, { token }),

  assignTask: (token: string, userId: number, taskId: number) =>
    api("/admin/user-tasks.php", {
      method: "POST",
      token,
      body: { user_id: userId, task_id: taskId },
    }),

  markTaskComplete: (token: string, userId: number, taskId: number) =>
    api("/admin/user-tasks.php", {
      method: "PUT",
      token,
      body: { user_id: userId, task_id: taskId, status: "COMPLETED" },
    }),

  revokeProject: (token: string, userId: number, projectId: number) =>
    api("/admin/update-user.php", {
      method: "PUT",
      token,
      body: { user_id: userId, action: "revoke_project", project_id: projectId },
    }),
};

// ============================================
// Types
// ============================================
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  subscription_status?: string;
  lab_access?: boolean;
}

export interface UserProfile extends AuthUser {
  last_login: string | null;
  created_at: string;
}

export interface UserProject {
  id: number;
  slug: string;
  title: string;
  difficulty: string;
  duration: string;
  tags: string[];
  status: string;
  granted_at: string;
}

export interface ProjectWithAccess {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  tags: string[];
  status: string;
  has_access: boolean;
  is_active: boolean;
  total_tasks: number;
  completed_tasks: number;
}

export interface PublicProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  tags: string[];
  status: string;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  sort_order: number;
  project_title: string;
  user_name: string;
  user_status: "PENDING" | "COMPLETED";
  completed_at: string | null;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  subscription_status: string;
  lab_access: boolean;
  last_login: string | null;
  created_at: string;
  projects: string | null;
  project_ids?: number[];
}

export interface AdminProject {
  id: number;
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  tags: string[];
  status: string;
  is_active: boolean;
  total_tasks: number;
  enrolled_users: number;
}

export interface AdminTask {
  id: number;
  project_id: number;
  title: string;
  description: string;
  sort_order: number;
  project_title: string;
  assigned_user_name: string | null;
  completed_by_count: number;
}

export interface AdminTestimonial {
  id: number;
  user_name: string;
  role_title: string;
  quote: string;
  is_active: boolean;
  sort_order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
}

export interface ProgressStats {
  total_tasks: number;
  completed_tasks: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  has_more: boolean;
}

// New types for admin user detail views
export interface UserProjectDetail {
  id: number;
  slug: string;
  title: string;
  status: string;
  granted_at: string;
  total_tasks: number;
  completed_tasks: number;
}

export interface UserTaskDetail {
  id: number;
  task_id: number;
  title: string;
  description: string;
  project_id: number;
  project_title: string;
  status: "PENDING" | "COMPLETED";
  assigned_at: string;
  completed_at: string | null;
}
