import {Outlet, Link} from 'react-router-dom';
import {Box, List, ListItem, Grid, GridItem} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons'


function Admin() {
    return (
        <Grid templateColumns='repeat(5, 1fr)' gap={6} mt="10">
            <GridItem textAlign="left" p="3" colSpan={1} bg='papayawhip'>
                <List spacing="3">
                    <ListItem>
                        <ArrowForwardIcon boxSize={6} color='teal.100' _hover={{color: "teal.500"}} />
                        <Link exact="true" to="profile">Profile</Link>
                    </ListItem>
                    <ListItem>
                        <ArrowForwardIcon boxSize={6} color='teal.100' _hover={{color: "teal.500"}} />
                        <Link to="product">Products</Link>
                    </ListItem>
                    <ListItem>
                        <ArrowForwardIcon boxSize={6} color='teal.100' _hover={{color: "teal.500"}} />
                        <Link to="order">Orders</Link>
                    </ListItem>
                </List>
            </GridItem>
            <GridItem bg='papayawhip' colSpan={4}>
                <Box p="10">
                        <Outlet/>
                </Box> 
            </GridItem>
        </Grid>
    )
}

export default Admin
