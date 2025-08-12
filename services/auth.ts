import axios from '@/lib/axios';
import type { LoginPayload, LoginResponse } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

// export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
//   const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
//   return response.data;
// };

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/login`,
    payload,
    { validateStatus: () => true } // ✅ prevents axios from throwing on 4xx/5xx
  );
  return response.data;
};


// Client-side logout function (no API call)
export const logoutUser = () => {
  localStorage.removeItem("userSession");
  window.location.href = "/login";
};
