
import { clientInstance } from "@/libs/http-clients.ts";
import { CreateData } from "@/types/timer";

export const createTimer = async (createData: CreateData) => {
  return clientInstance.post(`/timers`, createData)
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
};

export const getTimeList = async () => {
  return clientInstance.get('/timers')
  .then(response => {
    return response;
  })
  .catch(error => {
    throw error;
  });
};
