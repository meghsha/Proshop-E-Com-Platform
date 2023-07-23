import CheckoutSteps from "../components/CheckoutSteps"
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addPaymentMethod } from "../slices/cartSlice";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
    const [paymentMethod, setpaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart)
    // const { paymentMethod: paymentMethodFromCart } = cart
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress) {
            navigate("/shipping")
        }
    }, [shippingAddress, navigate])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(addPaymentMethod(paymentMethod))
        navigate("/placeorder")
    }
    
  return (
    <>
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className="my-2">
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => setpaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" className="my-2">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default PaymentScreen