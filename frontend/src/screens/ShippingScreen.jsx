import FormContainer from "../components/FormContainer"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { addShippingAddress } from "../slices/cartSlice"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = () => {
    const { shippingAddress } = useSelector((state) => state.cart)

    const [address, setaddress] = useState(shippingAddress?.address || "")
    const [city, setcity] = useState(shippingAddress?.city || "")
    const [postalCode, setpostalCode] = useState(shippingAddress?.postalCode || "")
    const [country, setcountry] = useState(shippingAddress?.country || "")

    const dispatch = useDispatch()
    const navigate = useNavigate()

  return (
    <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(addShippingAddress({ address, city, postalCode, country }))
                navigate("/payment")
            }}
        >
            <Form.Group controlId="address" className="my-2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={address}
                    required
                    onChange={(e) => setaddress(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="my-2">
                <Form.Label>City</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    required
                    onChange={(e) => setcity(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode" className="my-2">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Postal Code"
                    value={postalCode}
                    required
                    onChange={(e) => setpostalCode(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="my-2">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    required
                    onChange={(e) => setcountry(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
                <strong>Continue</strong>
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen