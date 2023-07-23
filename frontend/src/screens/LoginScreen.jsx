import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useLoginMutation } from '../slices/usersApiSlice'
import { toast } from "react-toastify"
import { setCredentials } from '../slices/authSlice'

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth)

    const [ login, { isLoading }] = useLoginMutation()
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, navigate, redirect])

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        const response = await login({ email, password }).unwrap();
        dispatch(setCredentials({...response}));
        navigate(redirect)
    } catch (error) {
        toast.error(error?.data?.message || error?.message);
    }
  }
  console.log(redirect, "redirect")
  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form>
            <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-2' onClick={submitHandler}
                disabled={isLoading}
            >Sign In</Button>
            { isLoading && <Loader />}
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer? <Link to={ redirect ? `/register?redirect=${redirect}` : '/register' }>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen