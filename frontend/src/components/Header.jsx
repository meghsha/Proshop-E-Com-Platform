import { Navbar , Nav, Container } from "react-bootstrap"
import { FaShoppingCart, FaUser} from "react-icons/fa"
import logo from "../assets/logo.png"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector } from "react-redux"
import  {Badge } from "react-bootstrap"

const Header = () => {

  const { cartItems } = useSelector(state => state.cart)
  console.log(cartItems, "header banana")
  
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt="logo"/>
                        ProShop
                    </Navbar.Brand>
                </LinkContainer>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link>
                                <FaShoppingCart className="me-1"/> Cart
                                {cartItems.length > 0 && (
                                    <Badge pill bg="success" style={{
                                        marginLeft: "5px",
                                    }}>
                                        {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/login">
                            <Nav.Link>
                                <FaUser className="me-1"/> Sign In
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header