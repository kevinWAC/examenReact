const URL_COLUMNS = "http://localhost:3010/columns";

export function getColumns() {
	return fetch(URL_COLUMNS)
		.then(response => response.json())
		.then((res)=> res)
		.catch(error => console.log("Error: ", error));
}