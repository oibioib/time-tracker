const BASE_URL = `https://cloggl.fly.dev/usertimers`;

async function getAlltimers(progectId: string) {
  const response = await fetch(`${BASE_URL}/${progectId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch id From IO');
  }
  const data = await response.json();
  // console.log(data);
  return data;
}

export default getAlltimers;
