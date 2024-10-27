import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Spinner, Table, TableCell } from "flowbite-react";
import {

  FaCheck,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
const DashUser = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [user, setUser] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [showModel, setModel] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  //   console.log(userPost);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/routes/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    setLoading(true);

    const startIndex = user?.length || 0;
    try {
      const res = await fetch(
        `/api/user/routes/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data)
      if (res.ok && data.users) {
        setUser((prev) => [...prev, ...data.users]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   console.log(user);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/routes/delete/${deleteUserId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUser((prev) => prev.filter((user) => user._id !== deleteUserId));
        setModel(false)
      } else {
        console.log(data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  return (
    <div className="table-auto w-full  overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser.isAdmin && user.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
            </Table.Head>
            {user.map((user) => (
              <Table.Body className="divide-y" key={user._id + user.updatedAt}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover bg-gray-500"
                    />
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-white font-serif">
                    {user.username.toUpperCase()}
                  </TableCell>
                  <TableCell>{user.email.toUpperCase()}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="text-red-500 hover:underline cursor-pointer">
                    <span
                      onClick={() => {
                        setModel(true);
                        setDeleteUserId(user._id);
                      }}
                    >
                      Delete
                    </span>
                  </TableCell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              color={"none"}
              className="text-teal-500 font-semibold text-xl w-full text-center py-5 "
            >
              {isLoading ? (
                <Spinner color={"success"} aria-label="Loading..." />
              ) : (
                "Show More"
              )}
            </button>
          )}
        </>
      ) : (
        <p>You Have No User Yet !!</p>
      )}
      <Modal popup size="md" show={showModel} onClose={() => setModel(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <FaExclamationCircle className="size-16 text-gray-600 mx-auto dark:text-gray-200" />
          <h3 className="text-center my-4 font-bold text-xl dark:text-gray-200 text-gray-600">
            Are You Sure want to delete the account
          </h3>
          <div className="flex justify-around ">
            <Button onClick={handleDeleteUser} color={"failure"}>
              Yes, I am Sure
            </Button>
            <Button onClick={() => setModel(false)} color={"success"} outline>
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashUser;
