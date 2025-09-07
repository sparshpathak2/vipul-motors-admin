import axios from '@/lib/axios';
import { GetAllQueriesResponse } from '@/lib/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getAllTruevalueModels = async () => {
  const response = await axios.get(`${API_BASE_URL}/true-value`);
  return response.data;
};

export const getTruevalueModel = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/true-value/${id}`);
  return response.data;
};

export const createTruevalueModel = async (payload: {
  modelName: string;
  description?: string | null;
  make?: string | null;
  year?: number | null;
  variant?: string | null;
  color?: string | null;
  imageId?: string | null;
}) => {
  const response = await axios.post(`${API_BASE_URL}/true-value`, payload);
  return response.data;
};

export const updateTruevalueModel = async (
  id: string,
  payload: {
    modelName?: string;
    description?: string | null;
    make?: string | null;
    year?: number | null;
    variant?: string | null;
    color?: string | null;
    imageId?: string | null;
  }
) => {
  const response = await axios.put(`${API_BASE_URL}/true-value/${id}`, payload);
  return response.data;
};

export const deleteTruevalueModel = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/true-value/${id}`);
  return response.data;
};
