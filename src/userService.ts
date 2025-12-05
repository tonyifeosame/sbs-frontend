const API_URL = 'http://localhost:8080';

export const fetchUserProfile = async (username: string) => {
    try {
        const response = await fetch(`${API_URL}/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user profile for ${username}`);
        }

        const data = await response.json();
        // backend returns a top-level user object for public profile
        return data;
    } catch (error: any) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

export const fetchUserBetslips = async (username: string, status?: string) => {
    try {
        let url = `${API_URL}/users/${encodeURIComponent(username)}/betslips`;
        if (status) url += `?status=${encodeURIComponent(status)}`;
        const res = await fetch(url);
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(text || `Failed to fetch betslips: ${res.status}`);
        }
        return res.json();
    } catch (err) {
        console.error('fetchUserBetslips error', err);
        throw err;
    }
};

export default fetchUserProfile;