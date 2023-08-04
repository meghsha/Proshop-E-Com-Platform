import { LinkContainer } from "react-router-bootstrap"
import { useGetProductsQuery } from "../../slices/productsApiSlice"
import { Table, Button, Row, Col } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa"
import { useCreateProductMutation, useDeleteProductMutation } from "../../slices/productsApiSlice"
import { toast } from "react-toastify";
import { useParams } from "react-router-dom"
import Paginate from "../../components/Paginate"

const ProductListScreen = () => {
    const { pageNumber } = useParams();

    const { data, isLoading, error, refetch } = useGetProductsQuery({pageNumber});

    const [createProduct, { isLoading: createProductLoading, error: createProductError }] = useCreateProductMutation();
    const [deleteProduct, { isLoading: deleteProductLoading, error: deleteProductError }] = useDeleteProductMutation();

    const hanldeDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteProduct(id)
                toast.success('Product deleted successfully');
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error?.message);
            }
        }
    }

    const createProductHandler = async () => {
        if(window.confirm('Are you sure you want to create a new product?')) {
            try {
                const response = await createProduct({}).unwrap();
                console.log(response);
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error?.message);
            }
        }
    }

  return (
    <>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-end'>
                    <Button className='btn-sm m-3' onClick={createProductHandler}>
                        <FaEdit /> Create Product
                    </Button>
            </Col>
        </Row>

        {createProductLoading && <Loader />}
        {deleteProductLoading && <Loader />}
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
                    {data?.products?.map((product) => {
                        return (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
        <Paginate page={data?.page} pages={data?.pages} isAdmin={true} />
    </>
  )
}

export default ProductListScreen