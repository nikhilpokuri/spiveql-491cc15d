// ============================================
// Spiveql API Client
// ============================================

// Change this to your cPanel backend URL in production
// e.g., "https://yourdomain.com/api"
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
  if (token) headers["Authorization"] = `Bearer ${token}`;

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
    api<{ token: string; user: AuthUser }>("/register.php", {
      method: "POST",
      body: { name, email, password },
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

  getProjects: (token: string) =>
    api<{ projects: ProjectWithAccess[] }>("/projects.php", { token }),

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
// Admin
// ============================================
export const adminApi = {
  getUsers: (token: string) =>
    api<{ users: AdminUser[] }>("/admin/users.php", { token }),

  updateUser: (token: string, userId: number, action: string, extra?: Record<string, unknown>) =>
    api("/admin/update-user.php", {
      method: "PUT",
      token,
      body: { user_id: userId, action, ...extra },
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
  has_access: boolean;
  total_tasks: number;
  completed_tasks: number;
}

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string;
  sort_order: number;
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
}

export interface ProgressStats {
  total_tasks: number;
  completed_tasks: number;
}
