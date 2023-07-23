import { Navbar , Nav, Container, NavDropdown } from "react-bootstrap"
import { FaShoppingCart, FaUser} from "react-icons/fa"
import logo from "../assets/logo.png"
import { useSelector, useDispatch } from "react-redux"
import { LinkContainer } from "react-router-bootstrap"
import { Badge } from "react-bootstrap"
import { logout } from "../slices/authSlice"
import { useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../slices/usersApiSlice"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector(state => state.cart)
  const { userInfo } = useSelector(state => state.auth)

  const [ callLogoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
        dispatch(logout());
        await callLogoutApi().unwrap();
        navigate("/login");
        window.location.reload()
    } catch (error) {
        console.log(error)
    }
  }

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
                        
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id="username">
                                <LinkContainer to="/profile">
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <LinkContainer to="/login">
                                <Nav.Link>
                                    <FaUser className="me-1"/> Sign In
                                </Nav.Link>
                            </LinkContainer>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header