import { LinkContainer } from "react-router-bootstrap"
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice"
import { Table, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaTimes, FaTrash, FaCheck, FaEdit } from "react-icons/fa"
import { toast } from "react-toastify";

const UserListScreen = () => {
    const { data: users, isLoading, refetch, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: deleteUserLoading, error: deleteUserError }] = useDeleteUserMutation();

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteUser(id);
                toast.success('User deleted successfully');
                await refetch();
            } catch (error) {
                toast.error(error?.data?.message || error?.message);
            }
        }
    }

  return (
    <>
        <h1>Users</h1>
        {deleteUserLoading && <Loader />}
        {isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
            <Table striped hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => {
                        return (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>{user.isAdmin ? (<FaCheck style={{ color: "green"}} /> ) : 
                                 ( <FaTimes style={{ color: "red"}} />)}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <FaEdit />
                                        </Button>
                                    </LinkContainer>
                                    <Button variant='danger' className='btn-sm' onClick={() => {handleDelete(user._id)}}>
                                        <FaTrash style={{ color: "white"}} />
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        ) }
    </>
  )
}

export default UserListScreen