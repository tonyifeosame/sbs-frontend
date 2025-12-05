const API_URL = 'http://localhost:8080';

interface LoginResponse {
  token: string;
}

interface RegisterPayload {
  username: string;
  password?: string;
  email?: string;
  fullName?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  country?: string;
  state?: string;
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(errorData.error || 'Invalid credentials');
  }

  return response.json();
};

export const register = async (payload: RegisterPayload): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'An unknown error occurred' }));
    throw new Error(errorData.error || 'Registration failed');
  }

  return response.json();
};