import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import { useParams } from "react-router-dom";

const UserListScreen = () => {
  const { pageNumber } = useParams();
  const { data, refetch, isLoading, error } = useGetUsersQuery({ pageNumber });
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure ?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
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
              {data.users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {!user.isAdmin && (
                      <>
                        <LinkContainer
                          to={`/admin/user/${user._id}/edit`}
                          style={{ marginRight: "10px" }}
                        >
                          <Button variant="light" className="btn-sm">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash style={{ color: "white" }} />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={true}
            route={"user"}
          />
        </>
      )}
    </>
  );
};
export default UserListScreen;
