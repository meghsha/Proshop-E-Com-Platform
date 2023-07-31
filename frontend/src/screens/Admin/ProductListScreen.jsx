import { LinkContainer } from "react-router-bootstrap"
import { useGetProductsQuery } from "../../slices/productsApiSlice"
import { Table, Button, Row, Col } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa"

const ProductListScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery();

    const hanldeDelete = (id) => {
        if (window.confirm('Are you sure?')) {
            // dispatch(deleteProduct(id))
            console.log("Deleted the product", id);
        }
    }
  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                <LinkContainer to='/admin/product/create'>
                    <Button className='btn-sm m-3'>
                        <FaEdit /> Create Product
                    </Button>
                </LinkContainer>
            </Col>
        </Row>

        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>PRICE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((product) => {
                        return (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}`}>
                                        <Button variant='light' className='btn-sm mx-2'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => {hanldeDelete(product._id)}} style={{ color: "white"}}>
                                        <FaTrash />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default ProductListScreen