import axios from "axios";
axios.defaults.headers.common["x-api-key"] =
  "live_8uOCn2m0ipJF7EUm5pKSglxG6lfpBh9pXaT5btRuw9SL3sWWuuZkDQWjEoW0Wt7A";

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
}

export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });
}
