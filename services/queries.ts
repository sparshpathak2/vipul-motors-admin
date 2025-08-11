import axios from '@/lib/axios';
import { GetAllQueriesResponse } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getAllQueries = async (): Promise<GetAllQueriesResponse> => {
  const response = await axios.get(`${API_BASE_URL}/queries`);
  return response.data; // this is a single object, not an array
};
