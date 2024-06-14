import { Box, Button, FormControl, FormErrorMessage, Input, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { signupAction } from '../../Redux/Auth/Action'

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email can not be empty"),
    password: Yup.string().min(8,"Password must be atleast 8 characters").required("Password is required")
})


const Signup = () => {
    const initialValues = { email: "" , username: "" , name:"" , password: ""}
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const { auth } = useSelector((store) => store) ;
    const toast = useToast() ;

    const handleNavigate = () => {
        navigate("/login");
    }

    const handleSubmit = (values,actions) => {
        dispatch(signupAction(values));
        actions.setSubmitting(false) ;
    }

    useEffect(()=>{
        if(auth.signup?.username){
            navigate("/login")
            toast({
                title: `Account created. ${auth.signup?.username}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }

    },[auth.signup])

  return (
    <div>
        <div className='border'>
            <Box p={8} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <img className='w-40 mb-5' src='insta-logo.png' alt='' />

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    {(formikProps) => 
                        <Form className='space-y-8'>
                            <Field name="email">
                                {({field,form}) => 
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <Input className='w-full' {...field} id='email' placeholder='email address'>
                                        </Input>
                                        <FormErrorMessage> {form.errors.email} </FormErrorMessage>
                                    </FormControl>
                                }
                            </Field>
                            <Field name="name">
                                {({field,form}) => 
                                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                                        <Input className='w-full' {...field} id='name' placeholder='name'>
                                        </Input>
                                        <FormErrorMessage> {form.errors.name} </FormErrorMessage>
                                    </FormControl>
                                }
                            </Field>
                            <Field name="username">
                                {({field,form}) => 
                                    <FormControl isInvalid={form.errors.username && form.touched.username}>
                                        <Input className='w-full' {...field} id='username' placeholder='username'>
                                        </Input>
                                        <FormErrorMessage> {form.errors.username} </FormErrorMessage>
                                    </FormControl>
                                }
                            </Field>
                            <Field name="password">
                                {({field,form}) => 
                                    <FormControl isInvalid={form.errors.password && form.touched.password}>
                                        <Input className='w-full' {...field} id='password' placeholder='password'>
                                        </Input>
                                        <FormErrorMessage> {form.errors.password} </FormErrorMessage>
                                    </FormControl>
                                }
                            </Field>
                            <p className='text-center'> People who use our service may have uploded your contact information to Instagram. Learn More </p>
                            <p className='text-center'> By signing up, you agree to our Terms, Privacy Policy and Cookies Policy</p>

                            <Button className='w-full' mt={4} colorScheme='blue' type='submit' isLoading={formikProps.isSubmitting}>
                                Register 
                            </Button>
                        </Form>
                    }

                </Formik>

            </Box>
            
        </div>
        <div className='border w-full border-slate-300 mt-3'>
            <p className='text-center'> Already have an account ? <span onClick={handleNavigate} className='ml-2 text-blue-700 cursor-pointer'> Login now </span> </p>
        </div>
    </div>
  )
}

export default Signup