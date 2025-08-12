export async function loginUser(userid, password) {
  // const res = await fetch('http://127.0.0.1:7000/users/token/', {
  const res = await fetch('https://api.pixmintai.com/users/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid, password })
  });

  if (!res.ok) throw new Error('Invalid credentials');

  const data = await res.json();  // { access, refresh }
  return data;
}