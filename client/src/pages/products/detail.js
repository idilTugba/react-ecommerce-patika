import {useParams} from 'react-router-dom';
import {ProductsDetail} from '../../api';
import { useQuery } from 'react-query';
import { Button, Text} from '@chakra-ui/react'
import styles from "./styles.module.css";
import ImageGallery from 'react-image-gallery';
import {useCard} from "./../../context/cardContext";

export default function ProductDetail() {

    const { productId } = useParams();

    const { isLoading, error, data } = useQuery(["Product", productId], () => ProductsDetail(productId))
    const {addBasket, cardItem} = useCard();

    const findItemBasket = cardItem.find((item)=> item._id === productId);
      
    if (isLoading) return ("Loading...")
    if (error) return ("an error:" + error.message)
    const images = data.photos.map((item) => {return ({original: item})}); 

    return (
        <div className={styles.productDetail}>
            <ImageGallery showPlayButton={false} items={images} />
            <Text mb="5" as="h2" fontSize="2xl">{data.title}</Text>
            <p>{data.description}</p>
            <Button onClick={()=>addBasket(data, findItemBasket)} mt="5" colorScheme={!findItemBasket ? "green": "pink"}>{!findItemBasket ? "Add Basket": "Remove Basket"}</Button>
                            
        </div>
    )
}
