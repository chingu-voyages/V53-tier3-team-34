import { Button } from "@/components/ui/button";
import type React from "react";

interface SettingsSidebarProps {
  handleToggleSidebar: () => void;
}
const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  handleToggleSidebar,
}) => {
  return (
    <div
      id="settings-sidebar"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
    >
      {/* Sidebar container (80% of the screen width) */}
      <div className="w-[80%] h-full  bg-transparent  backdrop-blur-[50px] p-8 relative text-white overflow-auto shadow-lg">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
          onClick={handleToggleSidebar}
        >
          ✖
        </button>

        {/* Sidebar Title */}
        <h2 className="text-2xl font-bold mb-6">Event Settings</h2>
        <div className="flex  justify-between space-x-4 mb-6">
          {/* Sidebar Tabs (Ticket Cost & Invite Guests) */}
          <div className="flex flex-col items-start  mb-6">
            <button
              type="button"
              className="px-6 py-3 bg-[#aeaaaa]/30 justify-start items-center gap-3 inline-flex"
            >
              🎟 Ticket Cost
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-[#aeaaaa]/30 justify-start items-center gap-3 inline-flex"
            >
              👥 Invite Guests
            </button>
          </div>

          {/* Start Ticket Type & Price Section */}
          <div>
            <div className="mb-6">
              <h3 className="text-white text-3xl font-semibold font-['Mona Sans'] leading-10">
                Friendship Contribution
              </h3>
              <p className="text-[#faf1e5] text-base font-normal font-['Inter'] leading-normal">
                For the Guest Approval: The payment amount will be <br />{" "}
                confirmed after approval.
              </p>

              {/* Start Ticket Name & Type */}

              <div className="flex items-center space-x-12 mt-5 ">
                <span className="w-[200px] text-gray-300 p-3 bg-[rgba(255,255,255,0.40)]">
                  Ticket Name
                </span>
                <select className="w-[200px] text-white p-3  bg-[rgba(255,255,255,0.40)]">
                  <option>General</option>
                  <option>VIP</option>
                </select>
              </div>

              {/* End  Ticket Name & Type */}

              {/* Start  Price Section */}
              <h3 className="text-lg font-semibold mt-8">Price</h3>
              <div className="flex items-center space-x-12 mt-3">
                <select className=" w-[200px]  text-white p-3 bg-[rgba(255,255,255,0.40)]">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
                <input
                  type="number"
                  placeholder="Price"
                  className="w-[200px] text-white p-3  bg-[rgba(255,255,255,0.40)]"
                />
              </div>
              {/* End Price Section */}
            </div>
            {/* End Ticket Type & Price Section */}

            {/*Start  Payment Methods Section */}
            <div className="mb-6 mt-8">
              <h3 className="text-lg font-semibold">Payment Methods</h3>
              <div className="mt-4 flex flex-col space-y-3">
                {["Apple Pay", "Paypal", "Bank Transfer", "Credit Card"].map(
                  (method) => (
                    <div
                      key={method}
                      className="flex items-center justify-between bg-[rgba(255,255,255,0.40)] p-3 w-[450px]"
                    >
                      <span className="text-gray-300">{method}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-[rgba(255,255,255,0.40)] peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                      </label>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
          {/*  End Payment Methods Section */}

          {/* Start  Price Section */}
          <div className="flex flex-col  items-end  justify-between  space-x-3  p-3 ">
            <select className="text-white p-3  bg-[rgba(255,255,255,0.40)] w-[200px]">
              <option>🎟 Support Our Event</option>
              <option>Free</option>
              <option>🎟 Standard Ticket</option>
            </select>
            {/* Save Changes Button (Bottom Right) */}

            <Button className="px-6 py-2 bg-[#084be7] justify-center items-center flex rounded-none ">
              Save Changes
            </Button>
          </div>
          {/* End Price Section */}
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
