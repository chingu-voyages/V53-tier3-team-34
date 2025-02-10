import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
              className="px-6 py-3 bg-[#aeaaaa]/30 justify-start items-center gap-3 inline-flex mb-1 w-[200px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <title>Ticket Cost</title>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.13717 11.5855L2.60164 15.121C2.21111 15.5115 2.21111 16.1447 2.60164 16.5352L4.05121 17.9848C5.0219 17.3417 6.3426 17.4478 7.19783 18.303C8.05306 19.1582 8.15913 20.4789 7.51602 21.4496L8.9656 22.8992C9.35612 23.2897 9.98929 23.2897 10.3798 22.8992L13.9153 19.3637L12.5011 17.9494C12.1106 17.5589 12.1106 16.9258 12.5011 16.5352C12.8917 16.1447 13.5248 16.1447 13.9153 16.5352L15.3296 17.9494L22.4006 10.8784C22.7912 10.4879 22.7912 9.85469 22.4006 9.46416L20.9511 8.01459C19.9804 8.65769 18.6597 8.55163 17.8044 7.6964C16.9492 6.84117 16.8431 5.52046 17.4862 4.54978L16.0367 3.1002C15.6461 2.70968 15.013 2.70968 14.6225 3.1002L7.55139 10.1713L8.9656 11.5855C9.35612 11.976 9.35612 12.6092 8.9656 12.9997C8.57507 13.3902 7.94191 13.3902 7.55139 12.9997L6.13717 11.5855ZM9.67271 15.121C9.28218 14.7305 9.28218 14.0973 9.67271 13.7068C10.0632 13.3163 10.6964 13.3163 11.0869 13.7068L11.794 14.4139C12.1846 14.8044 12.1846 15.4376 11.794 15.8281C11.4035 16.2186 10.7703 16.2186 10.3798 15.8281L9.67271 15.121Z"
                  fill="#DBD9D9"
                />
              </svg>

              <p className="pl-2">Ticket Cost</p>
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-[#aeaaaa]/30 justify-start items-center gap-3 inline-flex w-[200px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <title>Invite Guests</title>
                <path
                  d="M12 11.5C9.79086 11.5 8 9.70914 8 7.5C8 5.29086 9.79086 3.5 12 3.5C14.2091 3.5 16 5.29086 16 7.5C16 9.70914 14.2091 11.5 12 11.5Z"
                  fill="white"
                />
                <path
                  d="M3.00065 20.6992C3.38826 15.9265 7.26191 13.5 11.9833 13.5C16.7712 13.5 20.7049 15.7932 20.9979 20.7C21.0096 20.8955 20.9979 21.5 20.2467 21.5C16.5411 21.5 11.0347 21.5 3.7275 21.5C3.47671 21.5 2.97954 20.9592 3.00065 20.6992Z"
                  fill="white"
                />
              </svg>
              <p>Invite Guests</p>
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
            <Select defaultValue="supportOurEvent">
              <SelectTrigger className="w-60 rounded-none border-none text-white p-3  bg-[rgba(255,255,255,0.40)]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent className="w-60 rounded-none border-none  bg-[#26282b]">
                <SelectItem
                  value="supportOurEvent"
                  className="h-16 px-6 py-3 justify-start items-center gap-3 inline-flex text-[#faf1e5] text-base font-medium font-['Mona Sans'] leading-normal hover:!text-white hover:!bg-white/10 hover:rounded-none"
                >
                  💙 Support Our Event
                </SelectItem>
                <SelectItem
                  value="free"
                  className="h-16 px-6 py-3 justify-start items-center gap-3 inline-flex text-[#faf1e5] text-base font-medium font-['Mona Sans'] leading-normal hover:!text-white hover:!bg-white/10 hover:rounded-none"
                >
                  👼🏻 Free
                </SelectItem>
                <SelectItem
                  value="standardTicket"
                  className="h-16 px-6 py-3 justify-start items-center gap-3 inline-flex text-[#faf1e5] text-base font-medium font-['Mona Sans'] leading-normal hover:!text-white hover:!bg-white/10 hover:rounded-none"
                >
                  🎟 Standard Ticket
                </SelectItem>
              </SelectContent>
            </Select>
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
