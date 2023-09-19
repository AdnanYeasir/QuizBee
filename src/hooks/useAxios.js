import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://opentdb.com";

const useCustomAxios = ({ apiUrl }) => {
  const [responseData, setResponseData] = useState(null);
  const [errorData, setErrorData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(apiUrl)
        .then((response) => setResponseData(response.data))
        .catch((error) => setErrorData(error))
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, [apiUrl]);

  return { responseData, errorData, isLoading };
};

export default useCustomAxios;
