import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";
import { signOutSuccess } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";

const DashSideBar = () => {
  const [data] = useSearchParams();
  const [tab, setTab] = useState("");
  const result = data.get("tab");
  const dispatch = useDispatch();

  useEffect(() => {
    setTab(result);
  }, [result]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/routes/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={FaUser}
              label={"User"}
              labelColor={"dark"}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item  onClick={handleSignOut} icon={FaSignOutAlt} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
