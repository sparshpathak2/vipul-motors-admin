import axios from '@/lib/axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// ---------------------- IMAGES ----------------------

// GET all images
export const getImages = async () => {
  const response = await axios.get(`${API_BASE_URL}/media/images`);
  return response.data;
};

// UPLOAD an image
export const uploadImage = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// DELETE an image
export const deleteImage = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/media/images/${id}`);
  return response.data;
};

// ---------------------- BANNERS ----------------------

// GET all banners
export const getBanners = async () => {
  const response = await axios.get(`${API_BASE_URL}/media/banners`);
  return response.data;
};

// CREATE a banner
export const createBanner = async (payload: {
  screen?: string;
  order?: number;
  imageId: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/media/banners`, payload);
  return response.data;
};

// DELETE a banner
export const deleteBanner = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/media/banners/${id}`);
  return response.data;
};
