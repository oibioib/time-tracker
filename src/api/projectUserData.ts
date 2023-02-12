interface IBoardRequest {
  id: number;
  login: string;
  avatar_url: string;
}

export const BASE_URL = `https://cloggl.fly.dev/users`;

export async function createProjectUserData(userData: IBoardRequest) {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify({
      githubId: userData.id,
      githubName: userData.login,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch id From IO');
  }
  const data = await response.json();
  // console.log(data);
  return data;
}
