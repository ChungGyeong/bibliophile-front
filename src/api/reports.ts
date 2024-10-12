import { clientInstance } from "@/libs/http-clients.ts";
import { UpdateReportData, CreateData } from "@/types/report";

export const getReport = async (bookReportId: number) => {
  return await clientInstance.get(`/book-reports/${bookReportId}`)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const updateReport = async (bookReportId: number, updateData: UpdateReportData) => {
  return await clientInstance.patch(`/book-reports/${bookReportId}`, updateData)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const deleteReport = async (bookReportId: number) => {
  return await clientInstance.delete(`/book-reports/${bookReportId}`)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const createReport = async(createData: CreateData) => {
  return await clientInstance.post(`/book-reports`, createData)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}

export const getMyReport = async (myBookId: number) => {
  return await clientInstance.get(`/book-reports/mine/${myBookId}`)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
}