import { clientInstance } from "@/libs/http-clients.ts";
import { CreateData, UpdateReviewData } from "@/types/review";

export const getMyReview = async (myBookId: number) => {
  return await clientInstance.get(`/reviews/mine/${myBookId}`)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const createReview = async(createData: CreateData) => {
  return await clientInstance.post(`/reviews`, createData)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const deleteReview = async (reviewId: number) => {
  return await clientInstance.delete(`/reviews/${reviewId}`)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const updateReview = async (reviewId: number, updateData: UpdateReviewData) => {
  return await clientInstance.patch(`/reviews/${reviewId}`, updateData)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const getReviews = async (book: number) => {
  return await clientInstance.get('/reviews', {
    params: { book }
  })
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}