import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousal from "../components/ProductCarousal";
import Meta from "../components/Meta";

export const HomeScreen = () => {
    const { pageNumber, keyword } = useParams();

    const { data, error, isLoading } = useGetProductsQuery({keyword, pageNumber});
    console.log(data?.pages, data?.page, "data");

    return (
        <>
            {isLoading ? ( <Loader /> ) 
            : error ? ( <Message variant="danger" >{error?.error || error?.data?.message}</Message> ) 
            : (
                <>
                    {keyword ? (
                        <Link to="/" className="btn btn-light mb-3">
                            Go Back
                        </Link>
                    ) : (<ProductCarousal />)}
                    {
                        !keyword ? <h1>Latest Products</h1> : <h1>Search Results</h1>
                    }
                    <Row>
                        <Meta title={"Home"} />
                        {
                            data.products.map((product) => {
                                return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            })
                        }
                    </Row>
                    <Paginate page={data?.page} pages={data?.pages} keyword={keyword ? keyword : ""} />
                </>
            )}
        </>
    )
}
