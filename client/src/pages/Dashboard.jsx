import { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import ProfileSection from "../components/ProfileSection";

import DashSideBar from "../components/DashSideBar";

const Dashboard = () => {
  const [data] = useSearchParams();
  const [tab, setTab] = useState("");
  const result = data.get("tab")

  useEffect(() => {
    setTab(result);
  }, [result])
  return (
    <div  className="h-[200%]  flex flex-col md:flex-row">
      {/* Side Bar  */}
     <div className="">

     <DashSideBar />
     
     </div>
      {/* Profile Section  */}
      {tab=='profile' && (
        <div>
          <ProfileSection />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
