import { API_BASE_URL } from "./constants";

export async function searchPlants(searchTerm) {
  console.log("searching", searchTerm);
  const destination = API_BASE_URL + "search/?q=" + searchTerm;
  let results = {};

  try {
    const response = await fetch(destination);
    console.log("response", response);
    const data = await response.json();

    results = {
      total: data.meta ? data.meta.total : 0,
      links: data.links,
      data: data.data,
    };
  } catch (err) {
    throw new Error(err.message);
  }

  return results;
}

export async function searchDetail(searchId) {
  const destination = API_BASE_URL + "detail/?id=" + searchId;
  let results = {};

  try {
    const response = await fetch(destination);
    const data = await response.json();
    results = data;
  } catch (err) {
    throw new Error(err.message);
  }

  return results;
}
