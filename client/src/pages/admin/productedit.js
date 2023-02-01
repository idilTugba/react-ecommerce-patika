import {useParams} from 'react-router-dom'
import { ProductsDetail, updateProduct } from './../../api';
import ValidationSchema from './productValidation';
import {useQuery} from 'react-query';
import {Formik, FieldArray} from 'formik';
import {Box, FormControl, FormLabel, Input, Button, Textarea, Text} from '@chakra-ui/react';
import { message } from 'antd';


function ProductEdit() {
    const {productId} = useParams();
    const {isLoading, isError, data, error} = useQuery(['admin:product',productId],
        () => ProductsDetail(productId));
    const handleSubmit = async (values, bag) =>{
        message.loading({content: "Loading...", key: "product_update"});

        try{
            await updateProduct(values, productId)
            message.success({
                content: "The product updated",
                key: "product_update",
                duration: 1
            })
        } catch(e){
            message.error('The product couldnt update!')
        }
    }
    if(isLoading) return (<div>...Loading</div>)
    if(isError) return (<div>Error : {error.message}</div>)
    
    return (
        <div>
            <Formik
                initialValues={{
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    photos: data.photos
                }}
                validationSchema = {ValidationSchema}
                onSubmit={handleSubmit}
            >
                {
                    ({handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting })=> (
                        <div>
                            <Box textAlign="left">
                                <form onSubmit={handleSubmit}>
                                    <FormControl mb="3">
                                        <FormLabel>Title</FormLabel>
                                        <Input name="title" value={values.title} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} isInvalid={touched.title && errors.title}/>
                                        {(touched.title && errors.title) && <Text fontSize="sm" color="red">{errors.title}</Text> }
                                    </FormControl>
                                    <FormControl mb="3">
                                        <FormLabel>Description</FormLabel>
                                        <Textarea name="description" value={values.description} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} isInvalid={touched.description && errors.description}/>
                                        {(touched.description && errors.description) && <Text fontSize="sm" color="red">{errors.description}</Text> }
                                    </FormControl>
                                    <FormControl mb="3">
                                        <FormLabel>Price</FormLabel>
                                        <Input name="price" value={values.price} onChange={handleChange} onBlur={handleBlur} disabled={isSubmitting} isInvalid={touched.price && errors.price}/>
                                        {(touched.price && errors.price) && <Text fontSize="sm" color="red">{errors.price}</Text> }
                                    </FormControl>
                                    <FormControl mb="3">
                                        <FormLabel>Photos</FormLabel>
                                        <FieldArray 
                                            name="photos"
                                            render={(arrayHelpers)=>(
                                                <div>
                                                    {values.photos && 
                                                        values.photos.map((photo,index) => (
                                                            <div key={index}>
                                                              
                                                                <Input 
                                                                    name={`photos.${index}`}
                                                                    value={photo}
                                                                    onChange={handleChange}
                                                                    disabled={isSubmitting}
                                                                    width="70%"
                                                                />
                                                                <Button
                                                                    ml="3"
                                                                    type="button"
                                                                    colorScheme="red"
                                                                    onClick={()=>arrayHelpers.remove(index)}
                                                                >
                                                                    Remove
                                                                </Button>
                                                            </div>
                                                        ))
                                                        }
                                                    <Button
                                                        onClick={()=>arrayHelpers.push("")}
                                                        mt="3"
                                                    >Add Photo</Button>
                                                </div>
                                            )}    
                                        />
                                    </FormControl>
                                    <Button type="submit" isLoading={isSubmitting} width="100%">Edit</Button>
                                </form>
                            </Box>
                        </div>
                    )
                }
            </Formik>
        </div>
    )
}

export default ProductEdit
