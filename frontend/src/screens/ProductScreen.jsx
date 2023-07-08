import { useParams } from "react-router-dom"
import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Card, ListGroup, Image, ListGroupItem, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = () => {
    const { id } = useParams();

    const [currProduct, setCurrProduct] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get(`/api/products/${id}`)
            setCurrProduct(data)
        }
        fetchProducts()
    }, [id])

    // console.log(currProduct)
    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
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
                            <ListGroupItem>
                                 <Button
                                    disabled={currProduct.countInStock === 0 ? true : false}
                                    type="button"
                                    className="btn-block"
                                >
                                    Add To Cart
                                </Button>
                            </ListGroupItem>
                           
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen