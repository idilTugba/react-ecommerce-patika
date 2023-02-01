import {useCard} from './../../context/cardContext';
import {Box, Image, Button, Text, Alert, Grid, GridItem} from '@chakra-ui/react'
import {Link, Outlet} from 'react-router-dom'

function Basket() {
    const {cardItem, removeBasket} = useCard();

    const total = cardItem.reduce((acc, item) => acc + item.price, 0);

    console.log(cardItem);
    return (
        <div>
            
                {cardItem.length < 1 && <>
                    <Outlet />
                    <Alert status="warning">There is no any item in your basket.</Alert>
                </>}
                {cardItem.length > 0 &&
                    (<Box p="5">
                        <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                            {cardItem.map((item)=>(
                                <GridItem key={item._id} textAlign={[ 'left', 'center' ]} bg='gray.100' p="3" >
                                    <Link to={`/products/${item._id}`}>
                                        <Text size="sm">{item.title + "-" + item.price}</Text>
                                        <Image loading="lazy" htmlWidth={200} my="5" mx="auto" src={item.photos[0]}/>
                                    </Link>
                                    <Button colorScheme="pink" onClick={()=>removeBasket(item._id)}>Remove the basket</Button>
                                </GridItem>
                            ))}
                        </Grid>
                        <Text mt="20" size="lg">Total: {total}</Text>
                        <Link to={`/basket/order`}><Button colorScheme="green" onClick="">Order</Button></Link>
                        <Outlet />
                    </Box>)
                }
            
        </div>
    )
}

export default Basket
