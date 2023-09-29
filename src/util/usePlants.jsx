import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading, setError, setData } from "../features/plant/plantSlice";
import { API_BASE_URL } from "./constants";

export function usePlants() {
  const data = useSelector((state) => state.plant.data);
  const error = useSelector((state) => state.plant.error);
  const isLoading = useSelector((state) => state.plant.isLoading);
  const searchTerm = useSelector((state) => state.plant.searchTerm);
  const dispatch = useDispatch();

  useEffect(
    function () {
      const controller = new AbortController();
      async function searchPlants(searchTerm) {
        // set is loading and error
        dispatch(setIsLoading(true));
        dispatch(setError(""));

        const destination = API_BASE_URL + "search/?q=" + searchTerm;
        let results = {};

        try {
          const response = await fetch(destination);

          const data = await response.json();

          results = {
            total: data.meta ? data.meta.total : 0,
            links: data.links,
            data: data.data,
          };
          dispatch(setData(results));
        } catch (err) {
          dispatch(setError(err.message));
        } finally {
          //set is loading to false
          dispatch(setIsLoading(false));
        }
      }

      searchPlants(searchTerm);
      return () => controller.abort();
    },
    [searchTerm, dispatch]
  );

  return { data, isLoading, error, searchTerm };
}
