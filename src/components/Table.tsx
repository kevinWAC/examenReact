import React, {useEffect, useState } from 'react'
import { useCategoryContext } from '../context/category'
import Column from './Column';
import { getColumns } from '../services/columns';
import { getCardsByCategory, updatePatchCard } from '../services/cards';

export default function Table() {
const {category} = useCategoryContext();
const [columns, setColumns] = useState<Column[]>([]);
const [cards, setCards] = useState<Card[]>([]);
const [reload, setReload] = useState<boolean>(false);

const handleReload = () => {
  setReload((reload) => !reload)
}

useEffect(()=> {
  if(category !== null) {
    (async() => {
      const fetched_columns = await getColumns()
      const fetched_cards = await getCardsByCategory(category.id);
      setColumns(fetched_columns);
      setCards(fetched_cards)
      setReload(true)
    })();
  }
},[category, reload, setReload])


const handleMoveRight = (idCard: number, columnId: number) => {
  const index = columns!.findIndex(item => item.id === columnId);
  const lenght = columns!.length;
  if(index + 2 <= lenght) {
    updatePatchCard(idCard, index + 2)
    handleReload()
  }
}

const handleMoveLeft = (idCard: number, columnId: number) => {
  const index = columns!.findIndex(item => item.id === columnId);
  if(index > 0) {
     updatePatchCard(idCard, index)
     handleReload()
  }
}

  return (
    <div className='text-center'>
      <h1>{category?.name}</h1>
    <div className="d-flex justify-content-between p-2 mt-5 ">
      {columns.map((column, i) => <Column key={i} {...column} handleMoveRight={handleMoveRight} handleMoveLeft={handleMoveLeft} handleReload={handleReload} cards={cards}/>)}
    </div>
    </div>
  )
}
