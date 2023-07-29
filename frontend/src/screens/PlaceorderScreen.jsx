import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import CheckoutSteps from "../components/CheckoutSteps"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { toast } from "react-toastify"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { useCreateOrderMutation } from "../slices/ordersApiSlice"
import { clearCartItems } from "../slices/cartSlice"

const PlaceorderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector((state) => state?.cart)
    // const cartItems = JSON.parse(localStorage.getItem("cartItems"))
    // console.log(cart, "cart");
    // console.log(cart.shippingPrice, "shippingPrice");
    // console.log(cart.taxPrice, "taxPrice");

    useEffect(() => {
        if(!cart?.shippingAddress?.address){
            navigate('/shipping')
        } else if(!cart?.paymentMethod){
            navigate('/payment')
        }
    }, [cart?.shippingAddress?.address, cart?.paymentMethod, navigate])

    const [createOrder, { isLoading, error }] = useCreateOrderMutation()

    const handlePlaceOrder = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems())
            toast.success("Order placed successfully")
            navigate(`/order/${res._id}`)
        } catch (error) {
            toast.error(error)
        }
    }
    
  return (
    <>
        <CheckoutSteps step1 step2 step3 step4 />
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city},
                            {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment: </h2>
                        <p> 
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items: </h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                            <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index) => {
                                    return (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                )}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary: </h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items: </Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax: </Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total: </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cart.cartItems === 0}
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </Button>
                        </ListGroup.Item>
                        {isLoading && <Loader />}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceorderScreen