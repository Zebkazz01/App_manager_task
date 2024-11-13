import axios from "./axios";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const VerifyTokenRequest = () => axios.get(`/verify`);

export const LogoutRequest = () => axios.post(`/logout`);

export const updateProfileRequest = (formData) =>
  axios.post(`/profile`, formData);

// .then((response) => {
//   // Mostrar errores al momento de realizar peticiones de la vista al servidor
//   console.log("Registro exitoso:", response);
// })
// .catch((error) => {
//   if (error.response) {
//     // La solicitud fue hecha y el servidor respondió con un código de estado
//     // que cae fuera del rango de 2xx
//     console.log(error.response.data);
//     console.log(error.response.status);
//     console.log(error.response.headers);
//   } else if (error.request) {
//     // La solicitud fue hecha pero no se recibió respuesta
//     console.log(error.request);
//   } else {
//     // Algo ocurrió en la configuración de la solicitud que provocó un Error
//     console.log("Error", error.message);
//   }
// });
