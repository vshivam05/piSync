import { useState } from "react";
import Header from "../components/Header";
import DeviceTable from "../components/DeviceTable";
import ErrorTable from "../components/ErrorTable";

const Dashboard = () => {
  const [tab, setTab] = useState("devices");

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="left flex gap-4 mb-4">
            <button
              onClick={() => setTab("devices")}
              className={`px-4 py-2 rounded ${
                tab === "devices" ? " text-black underline border " : " "
              }`}
            >
              Device Management
            </button>
            <button
              onClick={() => setTab("errors")}
              className={`px-4 py-2 rounded ${
                tab === "errors" ? " text-black underline border" : " "
              }`}
            >
              Recent Errors
            </button>
          </div>
          <div className="right">
            <button>Refresh icon</button>
            <button>Logout icon</button>
          </div>
        </div>
        {tab === "devices" ? <DeviceTable /> : <ErrorTable />}
      </div>
    </div>
  );
};

export default Dashboard;
