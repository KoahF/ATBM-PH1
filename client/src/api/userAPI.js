import axiosClient from './axiosClient';

// api/userApi.js
const userApi = {
	getAll: async () => {
		const url = '/users';
		return await axiosClient.get(url);
	},
};

export default userApi;
