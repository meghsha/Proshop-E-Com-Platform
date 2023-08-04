import { useParams, useNavigate } from "react-router-dom"
import { Row, Col, Card, ListGroup, Image, ListGroupItem, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductByIdQuery, useCreateProductReviewMutation } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ProductScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setqty] = useState(1)
    const [rating, setrating] = useState(0);
    const [comment, setcomment] = useState("");

    const { data: currProduct, error, isLoading, refetch } = useGetProductByIdQuery(id);
    const [createProductReview, { isLoading: loadingReview }] = useCreateProductReviewMutation();

    const { userInfo } = useSelector(state => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({...currProduct, qty: Number(qty)}));
        navigate("/cart");
    }

    const reviewSubmitHandler = (e) => {
        e.preventDefault();
        createProductReview({ productId: id, rating, comment })
            .unwrap()
            .then(() => {
                toast.success("Review Added Successfully");
                setrating(0);
                setcomment("");
                refetch();
            })
            .catch((err) => {
                toast.error(err?.data?.message || err?.error);
            })
    }

    return (
        <div>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {isLoading ? ( <Loader /> ) 
            : error ? ( <Message variant="danger" >{error?.error || error?.data?.message}</Message> ) 
            : (
                <>
                    <Meta title={currProduct.name} description={currProduct.description} />
                    <Row>
                        <Col >
                            <Image src={currProduct.image} alt={currProduct.name} fluid />
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
                <Row className="review my-3">
                    <Col md={6}>
                    <h2>Reviews</h2>

                    {currProduct.reviews.length === 0 && <Message variant="info">No Reviews</Message>}
                    <ListGroup variant="flush">
                        {currProduct.reviews.map((review) => {
                            return (
                                <ListGroupItem key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={(review.rating)} />
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroupItem>
                            )
                        })}
                    </ListGroup>

                    <ListGroup>
                        <ListGroupItem>
                            <h2>Write a Customer Review</h2>
                        </ListGroupItem>
                        {loadingReview && <Loader />}

                        {userInfo ? (
                            <ListGroupItem>
                                <Form onSubmit={reviewSubmitHandler}>  
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            onChange={(e) => setrating(Number(e.target.value))}
                                        >
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Nice</option>
                                            <option value="5">5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            row="3"
                                            value={comment}
                                            onChange={(e) => setcomment(e.target.value)}
                                        >
                                        </Form.Control>
                                    </Form.Group>
                                    <Button 
                                        type="submit"
                                        variant="primary"
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </ListGroupItem>
                        ) : (<Message variant="info">Please <Link to="/login">Sign In</Link> to write a review</Message>)}
                    </ListGroup>
                </Col>
            </Row>
                </>
            ) }
        </div>
    )
}

export default ProductScreen