import {Button,Box,FormControl,FormLabel,Textarea, Flex} from '@chakra-ui/react'
import { useFormik } from "formik";
import {useCard} from './../../context/cardContext';
import {fetchOrder} from '../../api';
import {useNavigate} from 'react-router-dom'

function Order() {
    const {cardItem, emptyItems} = useCard();
    let navigate = useNavigate(); 
    const formik = useFormik({
        initialValues: {
            address: ""
        },
        onSubmit: async(values, bag) => {
            try{
                const itemsId = cardItem.map(item => item._id);
                const input = {
                    address: values.address,
                    items: JSON.stringify(itemsId)
                } 
                await fetchOrder(input);
                emptyItems();
                navigate("/basket/done");
            } catch(e){
                bag.setErrors({general: e.response.data.message});
            }
            
        }
    });

    return (
        <Flex align="center" justifyContent="center" bg="gray.100" mt="10" p="10">
            <Box>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>Address:</FormLabel>
                        <Textarea name="address" bg="white" placeholder="Address" 
                                    value={formik.values.address} 
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}></Textarea>
                    </FormControl>  
                    <Button p="4" mt="4" colorScheme="green" type="submit">Buy</Button>
                </form>
            </Box>
        </Flex>
    )
}

export default Order
