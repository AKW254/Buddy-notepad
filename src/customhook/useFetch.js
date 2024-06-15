import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (initialUrl, initialOptions = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios(url, options);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const doFetch = (newUrl, newOptions) => {
    setUrl(newUrl);
    setOptions(newOptions);
  };

  return { data, loading, error, doFetch, setData };
};

export default useFetch;
