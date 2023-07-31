import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useProfileMutation } from '../slices/usersApiSlice'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { toast } from "react-toastify"
import { setCredentials } from '../slices/authSlice'
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice'
import { FaTimes } from 'react-icons/fa'

const ProfileScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth)

    const [profile, { isLoading: updateProfileLoading }] = useProfileMutation()
    const { data: myOrders, isLoading: ordersLoading, error: ordersError } = useGetMyOrdersQuery();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        } else {
            try {
                const response = await profile({_id:userInfo._id, name, email, password }).unwrap();
                dispatch(setCredentials({...response}));
                toast.success("Profile Updated")
            } catch (error) {
                toast.error(error?.data?.message || error?.message);
            }
        }
    }

  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='my-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='my-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='my-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword' className='my-3'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-2'>Update </Button>
            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {ordersLoading ? <Loader /> : ordersError ? <Message variant='danger'>{ordersError}</Message> : (
                <Table striped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders?.map((order) => {
                            return (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<FaTimes style={{color: 'red'}} />)}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (<FaTimes style={{color: 'red'}} />)}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>Details</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            ) }
        </Col>
    </Row>
  )
}

export default ProfileScreen