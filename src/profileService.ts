const API_URL = 'http://localhost:8080';

export const uploadAvatar = async (file: File) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('You must be logged in to upload an avatar.');

  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_URL}/profile/avatar`, {
    method: 'POST',
    headers: {
      // 'Content-Type' is automatically set by the browser for FormData
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to upload avatar.');
  }

  return response.json();
};