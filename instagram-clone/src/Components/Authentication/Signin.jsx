import { Box, Button, FormControl, FormErrorMessage, Input } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup' 
import { signinAction } from '../../Redux/Auth/Action'
import { getUserProfileAction } from '../../Redux/User/Action'

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username can not be empty"),
    password: Yup.string().min(8,"Password must be atleast 8 characters").required("Password is required")
})

const Signin = () => {
    const initialValues = { username: "" , password: ""} ;
    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const { user,auth } = useSelector(store=>store) ;
    const jwt = localStorage.getItem("token") ;

    console.log("user: ",user.reqUser) ;

    const handleNavigate = () => {
        navigate("/signup");
    }

    const handleSubmit = (values, actions) => {
        dispatch(signinAction(values)) ;
        actions.setSubmitting(false) ;
    }

    useEffect(()=>{
        if(user.reqUser?.username){
            navigate(`/${user.reqUser?.username}`) ;
        }

    },[jwt,user.reqUser]) ;

    useEffect(()=> {
        if(jwt){
            dispatch(getUserProfileAction(jwt));
        }
    },[jwt]);

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
                            <Field name="username">
                                {({field,form}) => 
                                    <FormControl isInvalid={form.errors.email && form.touched.email}>
                                        <Input className='w-full' {...field} id='username' placeholder='username'>
                                        </Input>
                                        <FormErrorMessage> {form.errors.email} </FormErrorMessage>
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
                                Login 
                            </Button>
                        </Form>
                    }

                </Formik>

            </Box>
            
        </div>
        <div className='border w-full border-slate-300 mt-3'>
            <p className='text-center'> Don't have an account ? <span onClick={handleNavigate} className='ml-2 text-blue-700 cursor-pointer'> Register now </span> </p>
        </div>
    </div>
  )
}

export default Signin