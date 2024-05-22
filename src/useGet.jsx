import { useState,useEffect } from "react";

export default function useFetch(url) {
    
    
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)



    useEffect(() => {
      

        setTimeout(() => {

            fetch(url)
                .then((res) => {
                    if (res.ok)
                        return res.json()
                    else
                        throw Error("Invalid path")
                })
                .then((data) => {
                    setIsPending(false)
                    setError(null)
                    setData(data)
                })
                .catch(e => {
                    setError(e.message)
                    setIsPending(false)
                })

        }, 300);


        

    }, [url])



    return {data,isPending,error}
    

}