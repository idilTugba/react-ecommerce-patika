import {useEffect, useContext, useState, createContext} from 'react'

const CardContext = createContext();
const defaultCard = JSON.parse(localStorage.getItem("basket")) || [];

const CardProvider = ({children}) => {
    const [cardItem, setCardItem] = useState(defaultCard);

    useEffect(()=>{
        localStorage.setItem("basket", JSON.stringify(cardItem));
    },[cardItem]);

    const addBasket = (data, findItemBasket) =>{
        if(!findItemBasket) {
            setCardItem((prev) => [...prev, data]);
        } else {
            const filtered = cardItem.filter((item) => item._id !== findItemBasket._id)
            setCardItem(filtered);
        }
    }

    const removeBasket = (item_id) =>{
        const filtered = cardItem.filter((item) => item._id !== item_id);
        setCardItem(filtered);
    }

    const emptyItems = () => setCardItem([]);

    const values= {
        cardItem,
        setCardItem,
        addBasket,
        removeBasket,
        emptyItems
    }

    return (
        <CardContext.Provider value={values}> {children} </CardContext.Provider>
    )
}

const useCard = () => useContext(CardContext);

export {
    CardProvider,
    useCard
} 
