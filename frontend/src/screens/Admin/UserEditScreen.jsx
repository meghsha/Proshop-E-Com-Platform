import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useParams, useNavigate } from "react-router-dom"
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../slices/usersApiSlice"
import { useEffect, useState } from "react"
import FormContainer from "../../components/FormContainer"
import { Form, Button } from "react-bootstrap"

const UserEditScreen = () => {
    const { id: userId } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const { data: user, isLoading, error, refetch } = useGetUserByIdQuery(userId)
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await updateUser({
                userId,
                name,
                email,
                isAdmin,
            }).unwrap()
            toast.success("User updated successfully")
            refetch()
            navigate("/admin/userlist")
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

  return (
    <>
        <Link to="/admin/userlist" className="btn btn-light my-3">
            Go Back
        </Link>
        <FormContainer>
            <h1>Edit User</h1>
            {loadingUpdate && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {isLoading ? <Loader /> : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name" className="my-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="email" className="my-2">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="isAdmin" className="my-2">
                        <Form.Check
                            type="checkbox"
                            label="Is Admin"
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        >
                        </Form.Check>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="my-2">
                        Update
                    </Button>
                </Form>
            ) }
        </FormContainer>
    </>
  )
}

export default UserEditScreen