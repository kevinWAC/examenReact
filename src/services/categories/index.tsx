const URL_CATEGORIES = "http://localhost:3010/categories";

export function getCategories() {
	return fetch(URL_CATEGORIES)
		.then(response => response.json())
		.then((res)=> res)
		.catch(error => console.log("Error: ", error));
}

export function addCategory(category: Omit<Category, "id">) {
	return fetch(URL_CATEGORIES, {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "POST",
		body: JSON.stringify(category)
	})
	.then((res) => res.status)
	.catch(error => console.log("Error: ", error));
};

export function deleteCategory(categoryId: number) {
	fetch(`${URL_CATEGORIES}/${categoryId}`, {
		method: "DELETE",
	})
	.then((res) => res)
	.catch(error => console.log("Error: ", error));

}