
import { addProduct } from './../../api';
import ValidationSchema from './newproductValidation';
import {Formik, FieldArray} from 'formik';
import {Box, FormControl, FormLabel, Input, Button, Textarea, Text} from '@chakra-ui/react';
import { message } from 'antd';

function NewProduct() {
    
    const handleSubmit = async (values, bag) =>{
        message.loading({content :"loading...", key: "new_product"})
        
        const newProduct = {
            ...values, 
            photos: JSON.stringify(values.photos)
        }

        try{
            await addProduct(newProduct);
            message.success({content : "New product added", key: "new_product", duration: 1})
        } catch(e){
            message.errors('The product does not added.')
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    title: "",
                    description: "",
                    price: "",
                    photos: []
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

export default NewProduct

