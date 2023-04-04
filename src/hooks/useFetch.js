import { useState } from "react";
import { useEffect } from "react";
import response from "api/response";

export default function useFetch(url, objUtms) {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);

        const controller = new AbortController();
        const signal = controller.signal;
        const utms = objUtms ? ('?' + new URLSearchParams(objUtms).toString()) : '';

        response(url, {
            signal
        }, utms).then(data => {
            if(!data?.success) return 
            
            setData(data);
        }).finally(() => setFetching(false));

        return () => controller.abort();

    }, [url, objUtms]);

    return [data, fetching]
}