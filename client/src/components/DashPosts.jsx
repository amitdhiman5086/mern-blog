import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Spinner, Table, TableCell } from "flowbite-react";
const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [userPost, setUserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [isLoading, setLoading] = useState(false);
  console.log(userPost);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/routes/getposts?userId=${currentUser._id}`
        );
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
          if (data.posts.length < 9) {
            showMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id, currentUser.isAdmin]);

  const handleShowMore = async () => {
    setLoading(true);

    const startIndex = userPost.length;
    try {
      const res = await fetch(
        `/api/post/routes/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPost((prev) => [...prev, ...data.posts]);
        setLoading(false);
        if (data.posts.length < 9) {
          setShowMore(false);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="table-auto max-w-full overflow-x-scroll md:mx-auto px-3 scrollbar scrollbar-track-slate-300 scrollbar-thumb-slate-200   dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser.isAdmin && userPost.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>
                <span>Delete</span>
              </Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPost.map((post) => (
              <Table.Body className="divide-y" key={post._id + post.updatedAt}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </TableCell>
                  <TableCell className="text-gray-900 dark:text-white font-serif">
                    <Link to={`/post/${post.slug}`}>
                      {post.title.toUpperCase()}
                    </Link>
                  </TableCell>
                  <TableCell>{post.category.toUpperCase()}</TableCell>
                  <TableCell className="text-red-500 hover:underline cursor-pointer">
                    <span>Delete</span>
                  </TableCell>
                  <TableCell>
                    <Link
                      className="text-teal-500 font-semibold hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
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
              {isLoading ? <Spinner color={'success'} aria-label="Loading..." /> : "Show More"}
            </button>
          )}
        </>
      ) : (
        <p>You Have No Post Yet !!</p>
      )}
    </div>
  );
};

export default DashPosts;
