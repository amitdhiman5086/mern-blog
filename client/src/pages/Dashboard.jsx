import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import ProfileSection from "../components/ProfileSection";

import DashSideBar from "../components/DashSideBar";
import DashPosts from "../components/DashPosts";

const Dashboard = () => {
  const [data] = useSearchParams();
  const [tab, setTab] = useState("");
  const result = data.get("tab")

  useEffect(() => {
    setTab(result);
  }, [result])
  return (
    <div  className="h-full w-full flex flex-col md:flex-row">
      {/* Side Bar  */}
     <div className="">

     <DashSideBar />
     
     </div>
      {/* Profile Section  */}
      {tab=='profile' && (
        <div className="w-full ">
          <ProfileSection />
        </div>
      )}
      {tab=='posts' && (
        <div className="w-full">
          <DashPosts/>
        </div>
      )

      }
    </div>
  );
};

export default Dashboard;
