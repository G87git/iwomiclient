import apiClient from "api";

export const getAllUsers = () => {
    return new Promise(async (resolve, _) => {
      try {
        let response = await apiClient({
          method: "post",
          url: "/getAllUsers",
           body: {cetab: null}
        });
        if (response.data.status === "01") {
          resolve({ data: response.data.data });
        } else {
            console.log('ERROR');
          throw new Error(response.data.message || "An error occured");
        }
        resolve({ data: [] });
      } catch (error) {
        resolve({ data: [], error });
      }
    });
  };
export const getProfiles = () => {
    return new Promise(async (resolve, _) => {
      try {
        let response = await apiClient({
          method: "get",
          url: "/getProfiles",
        });
        if (response.data.status === "01") {
          resolve({ data: response.data.data });
        } else {
          throw new Error(response.data.message || "An error occured");
        }
        resolve({ data: [] });
      } catch (error) {
        resolve({ data: [], error });
      }
    });
  };