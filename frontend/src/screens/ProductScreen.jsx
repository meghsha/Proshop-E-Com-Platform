import { useParams, useNavigate } from "react-router-dom"
import { Row, Col, Card, ListGroup, Image, ListGroupItem, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductByIdQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [qty, setqty] = useState(1)

    const { data: currProduct, error, isLoading } = useGetProductByIdQuery(id);
    // console.log(currProduct)
    const addToCartHandler = () => {
        dispatch(addToCart({...currProduct, qty: Number(qty)}));
        navigate("/cart");
    }

    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {isLoading ? ( <Loader /> ) 
            : error ? ( <Message variant="danger" >{error?.error || error?.data?.message}</Message> ) 
            : (
                <Row>
                <Col md={5}>
                    <Image src={currProduct.image} alt={currProduct.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroupItem>
                            <h3>{currProduct.name}</h3>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Rating value={currProduct.rating} text={`${currProduct.numReviews} reviews`} />
                        </ListGroupItem>
                        <ListGroupItem>
                            Price: ${currProduct.price} 
                        </ListGroupItem>
                        <ListGroupItem>
                            Description: {currProduct.description} 
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col>
                                        ${currProduct.price}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>
                                        {currProduct.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            {currProduct.countInStock > 0 && (
                                <ListGroupItem>
                                <Row>
                                    <Col>Qty: </Col>
                                    <Col>
                                        <Form.Control 
                                            as="select" 
                                            value={Number(qty)}
                                            onChange={(e) => Number(setqty(e.target.value))}
                                        >
                                            {[...Array(currProduct.countInStock).keys()].map((x) => <option key={x+1} value={x+1}>{x+1}</option>)}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            )}
                            <ListGroupItem>
                                <Button
                                    disabled={currProduct.countInStock === 0 ? true : false}
                                    type="button"
                                    className="btn-block"
                                    onClick={addToCartHandler}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                           
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            ) }
        </div>
    )
}

export default ProductScreen