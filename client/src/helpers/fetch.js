export default async (url, options) => {
  const URL = `http://localhost:8000${url}`;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...options
  });
  return res.json();
};
