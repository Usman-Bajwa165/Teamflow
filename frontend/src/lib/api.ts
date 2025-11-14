// frontend/src/lib/api.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

function getAuthHeader(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("tf_access") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function toHeadersObject(h?: HeadersInit): Record<string, string> {
  const out: Record<string, string> = {};
  if (!h) return out;

  if (h instanceof Headers) {
    h.forEach((value, key) => {
      out[key] = value;
    });
    return out;
  }

  if (Array.isArray(h)) {
    for (const [key, value] of h) {
      out[key] = value;
    }
    return out;
  }

  // assume Record<string, string>
  return { ...h };
}

async function request(path: string, opts: RequestInit = {}) {
  // Build merged headers (Content-Type + any headers passed in opts)
  const mergedHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...toHeadersObject(opts.headers),
  };

  // Build final options: include everything from opts but ensure our mergedHeaders are used
  const fetchOpts: RequestInit = {
    ...opts,
    headers: mergedHeaders,
    credentials: "omit",
  };

  const res = await fetch(`${BASE}${path}`, fetchOpts);

// inside request()
  const text = await res.text();
  try {
    const json = text ? JSON.parse(text) : null;
    if (!res.ok) throw { status: res.status, body: json || text };
    return json;
  } catch (_err) {
    // Helpful detection: if the server returned an Express-style "Cannot GET /path" HTML/text,
    // it's likely the request hit a non-API server (wrong port / proxy). Add a hint.
    if (!res.ok) {
      const bodyStr = typeof text === 'string' ? text : JSON.stringify(text);
      if (bodyStr && bodyStr.includes('Cannot GET /')) {
        throw {
          status: res.status,
          body: text,
          hint: 'Request appears to have hit a non-API server (wrong port). Make sure backend runs on port 4000 and frontend on a different port (e.g. 3000).',
        };
      }
      throw { status: res.status, body: text };
    }
    return null;
  }
}

/* Auth */
export async function register(body: {
  email: string;
  password: string;
  name?: string;
}) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
}
export async function login(body: { email: string; password: string }) {
  return request("/auth/login", { method: "POST", body: JSON.stringify(body) });
}
export async function logout() {
  const h = getAuthHeader();
  return request("/auth/logout", { method: "POST", headers: h });
}
export async function refresh(refreshToken: string) {
  return request("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
}
export async function requestPasswordReset(email: string) {
  return request("/auth/request-password-reset", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
export async function resetPassword(token: string, newPassword: string) {
  return request("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });
}

/* Teams */
export async function createTeam(name: string) {
  return request("/teams", {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ name }),
  });
}
export async function getTeamDetails(teamId: string) {
  return request(`/teams/${teamId}`, { headers: getAuthHeader() });
}
export async function getAllTeams() {
  return request('/teams', { headers: getAuthHeader() });
}
export async function getMyTeams() {
  return request('/teams/my', { headers: getAuthHeader() });
}
export async function inviteToTeam(
  teamId: string,
  email: string,
  role = "member"
) {
  return request(`/teams/${teamId}/invite`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ email, role }),
  });
}
export async function getTeamMembers(teamId: string) {
  return request(`/teams/${teamId}/members`, {  headers: getAuthHeader() });
}

/* Projects & Board */
export async function createProject(name: string, description?: string, teamId?: string, dueDate?: string) {
  return request('/projects', {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ name, description, teamId, dueDate }),
  });
}

export async function getProject(projectId: string) {
  return request(`/projects/${projectId}`, { headers: getAuthHeader() });
}
export async function createColumn(projectId: string, title: string) {
  return request(`/projects/${projectId}/columns`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ title }),
  });
}
export async function deleteColumn(columnId: string) {
  return request(`/projects/columns/${columnId}`, { method: 'DELETE', headers: getAuthHeader() });
}
export async function createTask(
  columnId: string,
  title: string,
  description?: string
) {
  return request(`/projects/columns/${columnId}/tasks`, {
    method: "POST",
    headers: getAuthHeader(),
    body: JSON.stringify({ title, description }),
  });
}
export async function moveTask(
  taskId: string,
  targetColumnId: string,
  targetPosition: number
) {
  return request(`/projects/tasks/${taskId}/move`, {
    method: "PATCH",
    headers: getAuthHeader(),
    body: JSON.stringify({ targetColumnId, targetPosition }),
  });
}
export async function updateTask(taskId: string, data: Record<string, unknown>) {
  return request(`/projects/tasks/${taskId}`, {
    method: 'PATCH',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
}
export async function deleteTask(taskId: string) {
  return request(`/projects/tasks/${taskId}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
}

export async function listProjects() {
  return request('/projects', { headers: getAuthHeader() });
}

export async function updateProject(
  projectId: string,
  updates: { name?: string; description?: string; teamId?: string | null; dueDate?: string | null }
) {
  return request(`/projects/${projectId}`, {
    method: "PATCH",
    headers: getAuthHeader(),
    body: JSON.stringify(updates),
  });
}

export async function deleteProject(projectId: string) {
  return request(`/projects/${projectId}`, {
    method: "DELETE",
    headers: getAuthHeader(),
  });
}
