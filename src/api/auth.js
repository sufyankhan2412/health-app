const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const post = async (url, body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${url}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong.");
  return data;
};

const get = async (url, token) => {
  const res = await fetch(`${BASE}${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong.");
  return data;
};

export const registerUser  = (payload)        => post("/patient/register", payload);
export const verifyEmail   = (email, otp)      => post("/user/verifyEmail", { email, otp });
export const loginUser     = (email, password) => post("/user/login", { email, password });
export const getMe         = (token)           => get("/user/me", token);

export const saveToken   = (token) => localStorage.setItem("happ_token", token);
export const getToken    = ()      => localStorage.getItem("happ_token");
export const removeToken = ()      => localStorage.removeItem("happ_token");
export const isLoggedIn  = ()      => !!getToken();
