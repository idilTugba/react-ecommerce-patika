import {Box, Image, Button, Badge} from '@chakra-ui/react'
import { Link} from 'react-router-dom';
import moment from "moment"; 
import {useCard} from "./../../context/cardContext";

export default function Card({item}) {
    
    const property = {
        imageUrl: item.photos[0],
        imageAlt: item.description,
        date: moment(item.createdAt).format("DD/MM/YYYY"),
        title: item.title,
        formattedPrice: item.price
    }
    
    const {addBasket, cardItem} = useCard();
    const findItemBasket = cardItem.find((card_item)=> card_item._id === item._id);
    
    return (
        <Box maxW='sm' borderWidth="1px" overflow="hidden">
            <Link to={`/products/${item._id}`}>
                <Image loading="lazy" alt={property.imageAlt} src={property.imageUrl} />
                <Box textAlign="left" p="10px">
                    <Box display="flex" justifyContent="space-between">
                        <Badge borderRadius='full' px='2' colorScheme='teal'>New</Badge>
                        <Box as='span' alignItems="baseline" d="plex">{property.date}</Box>
                    </Box>
                    <Box lineHeight="tight" mt="2px" as="h4" fontWeight="semibold">{property.title}</Box>
                    <Box>{property.formattedPrice}</Box>
                </Box>
            </Link>
            <Button onClick={()=>addBasket(item, findItemBasket)} colorScheme="pink" colorScheme={!findItemBasket ? "green": "pink"}>{!findItemBasket ? "Add Basket": "Remove Basket"}</Button>
        </Box>
    )
}
