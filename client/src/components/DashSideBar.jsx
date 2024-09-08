import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

const DashSideBar = () => {
  const [data] = useSearchParams();
  const [tab, setTab] = useState("");
  const result = data.get("tab");

  useEffect(() => {
    setTab(result);
  }, [result]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === "profile"}
              icon={FaUser}
              label={"User"}
              labelColor={"dark"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item icon={FaSignOutAlt} className="cursor-pointer">
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSideBar;
