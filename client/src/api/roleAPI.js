import axiosClient from './axiosClient';

// api/roleApi.js
const roleApi = {
	getAll: async () => {
		const url = '/roles';
		return await axiosClient.get(url);
	},
};

export default roleApi;
