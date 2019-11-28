const axios = require("axios");

const instance = axios.create({
  baseURL: `https://swapi.co/api`
});

const getPeople = async () => {
  try {
    return (await instance.get("/people")).data;
  } catch (error) {
    console.error(error);
  }
};

const getPeopleById = async id => {
  try {
    return (await instance.get(`/people/${id}/`)).data;
  } catch (error) {
    console.error(error);
  }
};

const peopleSchema = async id => {
  try {
    return (await instance.get(`/people/schema/`)).data;
  } catch (error) {
    console.error(error);
  }
};

// const getPlanets = async () => {
//   let response = null;
//   try {
//     response = await instance.get("/planets");
//   } catch (error) {
//     console.error(error);
//   }
//   return response.data.results;
// };

const getPlanetsById = async id => {
  try {
    return (await instance.get(`/planets/${id}/`)).data;
  } catch (error) {
    console.error(error);
  }
};

// const getFilm = async () => {
//   let response = null;
//   try {
//     response = await instance.get("/film");
//   } catch (error) {
//     console.error(error);
//   }

//   return response.data.results;
// };

// const getFilmById = async id => {
//   console.log("Id:", id);
//   let response = null;
//   try {
//     response = await instance.get(`/film/${id}/`);
//   } catch (error) {
//     console.error(error);
//   }

//   return response.data;
// };

module.exports = {
  getPeople,
  getPeopleById,
  peopleSchema,
  getPlanetsById
  // getPlanets,
  // getFilm,
  // getFilmById
};
