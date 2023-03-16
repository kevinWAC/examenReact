const URL_CARDS = "http://localhost:3010/cards";

export function getCardsByCategory(id: number) {
	return fetch(`${URL_CARDS}?category=${id}`)
		.then(response => response.json())
		.then((res)=> res)
		.catch(error => console.log("Error: ", error));
}

export function addCard(card: Omit<Card, "id">) {
		return fetch(URL_CARDS, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(card)
		})
		.then((res) => res.status)
		.catch(err => console.log(err))
	};

export function deleteCard(cardId: number) {
	return fetch(`${URL_CARDS}/${cardId}`, {
		method: "DELETE",
	})
	.then((res) => res.status)
	.catch(error => console.log("Error: ", error));
}

export function deleteCardByCategory(categoryId: number) {
	fetch(`${URL_CARDS}?category=${categoryId}`, {
		method: "DELETE",
	})
	.then((res) => res)
	.catch(error => console.log("Error: ", error));
}

export function updateCard(updCard: Card) {
		return fetch(`${URL_CARDS}/${updCard.id}`, {
			method: "PUT",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({...updCard, "id": updCard.id})
		  })
	}
export function updatePatchCard(idCard:number, columnId: number){
	fetch(`${URL_CARDS}/${idCard}`, {
		method: 'PATCH',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({"column": columnId})
	  })
	  .then(response => {
		return response.json();
	  })
	  .catch(error => console.log("Error: ", error));
}
