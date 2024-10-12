import { fileUploadInstance } from "@/libs/http-clients.ts";

export const createImage = async (formData: FormData) => {
  return fileUploadInstance.post('/file/image', formData)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    throw error;
  });
}