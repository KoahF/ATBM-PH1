import http from './httpService';
import { apiUrl } from '../config.json';

///////start
const apiEndpoint = apiUrl + '/movies'; // const apiEndpoint = apiUrl + '/users';
///////end

///////start
function getMovieUrl (id) {
	return `${apiEndpoint}/${id}`;
}
function getUserUrl (id) {
	return `${apiEndpoint}/${id}`;
}
///////end

export function getMovies () {
	return http.get(apiEndpoint);
}

export function getMovie (movieId) {
	return http.get(getMovieUrl(movieId));
}
///////start
export function deleteMovie (movieId) {
	return http.delete(getMovieUrl(movieId));
}
export function deleteUser (userId) {
	return http.delete(getUserUrl(userId));
}
///////end

export function saveMovie (movie) {
	if (movie._id) {
		const body = { ...movie };
		delete body._id;
		return http.put(getMovieUrl(movie._id), body);
	}
	return http.post(apiEndpoint, movie);
}
