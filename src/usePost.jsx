import { useState, useEffect, useRef } from 'react';

export default function usePost(url, options = {}) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
    
      if (!url ) {
        console.log("url is falsy")
        return;
      } else {
        console.log("urlis truthy")
      }

      setIsPending(true);
      setError(null);
      
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
        setIsPending(false);
      } catch (err) {
        console.log(err)
        setError(err.message);
        setIsPending(false);
      }
    };

    

    fetchData();
    console.log(data.error)

  }, [url]);

  return { data, isPending, error };
}
