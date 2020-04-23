
const fetchError = (response) => {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
};

module.exports = fetchError;