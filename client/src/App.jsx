import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUP from "./pages/SignUP";
import Project from "./pages/Project";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OnlyAdminProtectedRoute from "./components/OnlyAdminProtectedRoute";
import CreatePostPage from "./pages/CreatePostPage";
import PageNotFound from "./components/PageNotFound";
import UpdatePost from "./pages/UpdatePost";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen w-screen box-border overflow-x-hidden">
      <header className="sticky bg-white shadow-lg top-0 z-10">
        <Header />
      </header>
      <main className="flex-grow my-6 z-0">
        {/* Use flex-grow to ensure the Outlet takes the available space */}
        <Outlet />
      </main>
      <footer className="z-10">
        <Footer />
      </footer>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUP />,
      },
      {
        path: "/project",
        element: <Project />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
      {
        element: <OnlyAdminProtectedRoute />,
        children: [
          {
            path: "/create-post",
            element: <CreatePostPage />,
          },
          {
            path: "/update-post/:postId",
            element: <UpdatePost />,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
