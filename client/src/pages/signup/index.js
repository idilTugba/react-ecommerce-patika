import React from 'react'
import {Button,Box,Heading,FormControl,FormLabel,Input, Flex, FormErrorMessage, Alert} from '@chakra-ui/react'
import { useFormik } from "formik";
import validationSchema from "./validations";
import {fetchRegister} from "./../../api";
import {useAuth} from "./../../context/";
import {useNavigate} from 'react-router-dom'

export default function Signup() {
    const {login} = useAuth();
    let navigate = useNavigate(); 

    const formik = useFormik({
        initialValues : {
            email: "",
            password: "",
            passwordConfirm: ""
        },
        onSubmit : async(values, bag) =>{
            try{
                const registerResponse = await fetchRegister({
                    email: values.email, 
                    password: values.password
                });
                login(registerResponse, navigate("/"));
            } catch(e){
                bag.setErrors({general: e.response.data.message});
            }
        },
        validationSchema
    })

    return (
        <Flex align="center" justifyContent="center" width="full">
            <Box>
                <Box mb="10">
                    <Heading>Sign Up</Heading>
                </Box>
                <Box mb="4">
                    {formik.errors.general && (<Alert status="error"> {formik.errors.general} </Alert>)}
                </Box>
                <Box>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl mb="4">
                            <FormLabel> E-mail </FormLabel>
                            <Input name="email" 
                                value={formik.values.email} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.email && formik.errors.email}
                            />
                            <FormErrorMessage name="email"></FormErrorMessage>
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel> Password </FormLabel>
                            <Input name="password" type="password" 
                                value={formik.values.password} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.password && formik.errors.password}
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel> Password Confirm </FormLabel>
                            <Input name="passwordConfirm" type="password" 
                                value={formik.values.passwordConfirm} 
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                            />
                        </FormControl>
                        <Button type="submit" width="full">Sign Up</Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    )
}
