/**
 * File by Gabriel Aldous
 */
import { useEffect, useState } from "react";

/**
 * 
 * @param {string} url the url to make the fetch call to
 * @param {JSON} options JSON object with the fetch parameters
 * @returns isLoading, a boolean true if the request is loading and false if request is done
 * @returns responseData, a JSON object with response from the external source
 * @returns fetchError, any error message while making the fetch request, or null if no error
 */
export default function useFetch(url, options) {
    const [isLoading, setIsLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        //Setup for making the fetch request
        setIsLoading(true);
        setResponseData(null);
        setFetchError(null);

        //Async function to make the actual request
        const requestData = async () =>  {
            try  {
                const response = await fetch(url, options);
                const data = await response.json();
                setResponseData(data);
            } catch (error)  {
                setFetchError(error);
            } finally  {
                setIsLoading(false);
            }
        }

        requestData();
    }, [url, options]);

    return {isLoading, responseData, fetchError};
}