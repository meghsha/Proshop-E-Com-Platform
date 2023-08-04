import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'
import Loader from './Loader'
import Message from './Message'

const ProductCarousal = () => {

    const { data: products, isLoading, error } = useGetTopProductsQuery();
  return (
    <>
        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Carousel pause='hover' className='bg-dark'>
                {products?.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption style={{position: "absolute", left: "0px"}}>
                                <h2>{product.name} (${product.price})</h2>
                            </Carousel.Caption>
                            <div
                                style={{position: "absolute", fontSize: "25px", right: "50px", top: "120px", color: "white",  width: "40%", padding: "10px"}}
                            >
                                {product.description}
                            </div>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )}
    </>
  )
}

export default ProductCarousal