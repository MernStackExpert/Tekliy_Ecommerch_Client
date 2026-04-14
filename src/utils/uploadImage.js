import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const apiKey = process.env.NEXT_PUBLIC_IMGBBAPI; 
  const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
  return res.data.data.url;
};