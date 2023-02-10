import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        /* we have an abort controller object and what we can do with it
        is we can associate it with a specific fetch request and once
        we 've associated it with a fetch we can use that abort controller
        to stop the fetch */
        const abortController = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortController.signal })  // associating abortController with the fetch
                .then(res => {
                    if(!res.ok) {
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch(err => {
                    if(err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsPending(false);
                        setError(err.message);
                        setData(null);
                    }
                })
        }, 1000);

        /* when the component that uses this useEffect() or usefetch()
        hook unmounts it fires that returned cleanup function */

        // return () => console.log('cleanup');
        return () => abortController.abort();

    }, [url]);

    return { data, isPending, error };
}

export default useFetch;