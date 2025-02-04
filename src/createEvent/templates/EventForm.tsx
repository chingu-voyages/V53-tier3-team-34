"use client";
import { useSession } from "next-auth/react";
import { Peralta } from "next/font/google";
import { useCallback, useState, useEffect } from "react";
import { z } from "zod";
import Input from "../molecules/Input";
import TextArea from "../molecules/TextArea";
import ToggleInput from "../molecules/ToggleInput";
import ChipsList from "../oragnisms/ChipsList";
import RSVP from "../oragnisms/RSVP";

import { createEvent } from "@/actions/createEvent";
import { saveEventToIndexedDB } from "@/app/(pages)/events/create/indexedDBActions";
import { Button } from "@/components/ui/button";
import ImagePicker from "@/createEvent/oragnisms/ImagePicker";
import { useCreateEventTheme } from "@/providers/themeProvider";
import Link from "next/link";
import { icons } from "../config/icons";
import { type MoodType, defaultFormValuesRSVPMoods } from "../config/rvspMood";
import EventImage from "../molecules/EventImage";
import DateRangePicker from "../oragnisms/DateRangePicker";
import ImageUpload from "../oragnisms/ImageUpload";
import TopMenu from "../oragnisms/TopMenu";
import "../../app/globals.css";
const peralta = Peralta({
  weight: "400",
  subsets: ["latin"],
});

const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  startDateTime: z.date(),
  endDateTime: z.date(),
  description: z.string().nullable(),
  style: z.string().nullable(),
  imageUrl: z.string().url().nullable(),
  reason: z.string().nullable(),
  guestHonor: z.string().nullable(),
  host: z.string().nullable(),
  userGuestLimit: z.number().nullable(),
  maxGuestLimit: z.number().nullable(),
  address: z.string().nullable(),
  isOutdoor: z.boolean().default(false),
  costPerPerson: z.number().nullable(),
  isPublic: z.boolean().default(false),
  requireGuestApproval: z.boolean().default(false),
  rsvpMoods: z.array(
    z.object({
      value: z.enum(["attending", "maybe", "regretfully"]),
      emoji: z.string().nullable(),
    }),
  ),
  chips: z.array(z.object({ value: z.string(), inputValue: z.string() })),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

export type BooleanKeys<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never;
}[keyof T];

const EventForm = () => {
  const { data: session } = useSession();
  const { theme } = useCreateEventTheme();

  const [formData, setFormData] = useState<EventFormData>(() => {
    // ✅ Retrieve cached data on initial load
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("cachedEventData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Convert string dates back to Date objects
        return {
          ...parsedData,
          startDateTime: new Date(parsedData.startDateTime),
          endDateTime: new Date(parsedData.endDateTime),
        };
      }
    }

    // Default form values if no cached data
    return {
      title: "",
      startDateTime: new Date(),
      endDateTime: new Date(new Date().setHours(new Date().getHours() + 1)),
      description: null,
      style: null,
      reason: null,
      imageUrl: null,
      guestHonor: null,
      host: null,
      userGuestLimit: null,
      maxGuestLimit: null,
      address: null,
      isOutdoor: false,
      costPerPerson: null,
      isPublic: false,
      requireGuestApproval: false,
      rsvpMoods: defaultFormValuesRSVPMoods,
      chips: [],
    };
  });

  // State to manage image picker
  const [showImagePicker, setShowImagePicker] = useState(false);

  function handleShowImagePicker(state: boolean) {
    setShowImagePicker(state);
  }

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value , type } = e.target;

      // Handle switches differently (for `isOutdoor`, `isPublic`, and `requireGuestApproval`)
      setFormData((prevState) => {
        const updatedData = {
          ...prevState,
          [name]: type === "number" ? (value ? Number(value) : null) : value,
        };

        localStorage.setItem("cachedEventData", JSON.stringify(updatedData)); // Save to localStorage
        return updatedData;
      });

    },
    [],
  );

  const handleToggleChange = useCallback((name: BooleanKeys<EventFormData>) => {
    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
      [name]: !prevState[name], // Toggle the value
    };

    localStorage.setItem("cachedEventData", JSON.stringify(updatedData)); // Save to localStorage
    return updatedData;
    });
  }, []);

  const handleRSVPMoodChange = useCallback((value: MoodType, emoji: string) => {
    setFormData((prevState) => {
      const updatedData = {
        ...prevState,
      rsvpMoods: prevState.rsvpMoods.map((mood) =>
        mood.value === value ? { ...mood, emoji } : mood,
      ),
    };

    localStorage.setItem("cachedEventData", JSON.stringify(updatedData)); // Save to localStorage
    return updatedData;
    
    });
    console.log(formData)
    
  }, []);

  const handleChipsChange = useCallback(
    (chipValue: string, inputValue: string, isSelected: boolean) => {
      const chips = formData.chips;
      const existingChipIndex = chips.findIndex(
        (chip) => chip.value === chipValue,
      );

      if (!isSelected) {
        chips.splice(existingChipIndex, 1);
      } else if (existingChipIndex === -1) {
        chips.push({ value: chipValue, inputValue });
      } else {
        const chip = chips[existingChipIndex];
        chip.inputValue = inputValue;
      }

      // console.log(chips);
      setFormData((prevState) => {
    
      const updatedData = {
        ...prevState,
        chips : chips, // React state maintains 'chips'
      };

     
        localStorage.setItem("cachedEventData", JSON.stringify(updatedData)); // Save to localStorage
        console.log(updatedData)
       
        console.log("Cached Data:", localStorage.getItem("cachedEventData"));
        return updatedData;
      });
      
    },
    [formData.chips],
  );

  // const handleChipsChange = useCallback(
  //   (chipValue: string, inputValue: string, isSelected: boolean) => {
  //     const chips = formData.chips;
  //     const existingChipIndex = chips.findIndex(
  //       (chip) => chip.value === chipValue,
  //     );

  //     if (!isSelected) {
  //       chips.splice(existingChipIndex, 1);
  //     } else if (existingChipIndex === -1) {
  //       chips.push({ value: chipValue, inputValue });
  //     } else {
  //       const chip = chips[existingChipIndex];
  //       chip.inputValue = inputValue;
  //     }

  //     // console.log(chips);
  //     setFormData((prevFormData) => {
  //       return {
  //         ...prevFormData,
  //         chips: chips,
  //       };
  //     });
  //   },
  //   [formData.chips],
  // );

  const handleImageChange = useCallback((imageURL?: string) => {
    if (imageURL) {
      setFormData((prevState) => ({
        ...prevState,
        imageUrl: imageURL,
      }));
      <EventImage image={imageURL} />;
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    localStorage.removeItem("cachedEventData"); 
    try {
      e.preventDefault();
      eventFormSchema.parse(formData); // Will throw an error if validation fails
      if (!session) {
        saveEventToIndexedDB(formData);
        console.log(formData.chips)
        return;
      }
      console.log("Form is valid! Submitting...");
      createEvent(formData);
      // Proceed with submission logic

    } catch (e) {
      console.log(e);
    }
  };



  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col min-h-screen items-stretch">
      {/* Placed onchange and image url from image upload in image picker  */}

      <ImagePicker
        onImageSelect={handleImageChange}
        isVisible={showImagePicker}
        onClose={() => handleShowImagePicker(false)}
      />
      <header className="flex justify-between items-center bg-red-600 p-2 md:py-9 md:px-16">
        <h1
          className={`text-white text-4xl font-normal ${peralta.className} leading-tight`}
        >
          Partiyo
        </h1>
        {!session && (
          <Link href="/register">
            <Button
              // className="px-6 py-2 h-16 bg-[#084be7] text-center text-white text-base font-bold leading-normal"
              className="px-6 py-2 h-16 bg-[#084be7] text-white text-center text-base font-bold leading-normal w-max inline self-end rounded-none"
              type="button"
            >
              
              Sign In
            </Button>
          </Link>
        )}
      </header>

      <form
        onSubmit={handleSubmit}
        className={`p-2 pt-0 md:pb-9 md:px-16 flex-1 flex flex-col gap-3 ${theme.pageBgImage} bg-cover bg-center `}
      >
        <div className="w-full flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-11">
          <div className="flex flex-col ">
            {/* Pass handleToggleSidebar to TopMenu */}
            <TopMenu onSettingsClick={handleToggleSidebar}/>
            <div className="flex flex-col space-y-3">
            <Input
              name="title"
              placeholder="Untitled Event"
              value={formData.title}
              onChange={handleChange}
              isRequired={true}
              parentClassName="h-24"
              className="text-6xl placeholder:text-6xl leading-10 h-24 font-semibold"
            />
            
            <DateRangePicker
              initialDateFrom={new Date(formData.startDateTime)} // ✅ Convert back to Date
              initialDateTo={new Date(formData.endDateTime)} // ✅ Convert back to Date
              showCompare={false}
              align="start"
              onUpdate={({ range }) => {
                setFormData((prevState) => {
                  const updatedData = {
                    ...prevState,
                    startDateTime: new Date(range.from), // ✅ Convert back to Date
                    endDateTime: new Date(range.to || range.from), // ✅ Convert back to Date
                  };

                  // ✅ Store in localStorage as ISO string
                  localStorage.setItem(
                    "cachedEventData",
                    JSON.stringify({
                      ...updatedData,
                      startDateTime: updatedData.startDateTime.toISOString(),
                      endDateTime: updatedData.endDateTime.toISOString(),
                    })
                  );

                  console.log("Updated formData inside setFormData:", updatedData);
                  return updatedData;
                });
              }}
            />

            <Input
              icon={icons.cake}
              name="reason"
              placeholder="Reason to Celebrate"
              value={formData.reason || ""}
              onChange={handleChange}
              isRequired={true}
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.person}
              name="guestHonor"
              value={formData.guestHonor || ""}
              onChange={handleChange}
              preText="Guest of Honor"
              placeholder="(Maria Tash)"
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.host}
              preText="Hosted by"
              placeholder="(Kaia)"
              value={formData.host || ""}
              onChange={handleChange}
              name="host"
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.chair}
              placeholder="(Maximum)"
              postText="Attendance"
              value={formData.maxGuestLimit || ""}
              onChange={handleChange}
              name="maxGuestLimit"
              type="number"
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.addPeople}
              placeholder="(0)"
              preText="Bring Guest"
              value={formData.userGuestLimit || ""}
              onChange={handleChange}
              name="userGuestLimit"
              type="number"
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.location}
              name="address"
              placeholder="MInistry Of Sound, 103 Gaunt ST, LONDON, SE1 6DP"
              value={formData.address || ""}
              onChange={handleChange}
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <Input
              icon={icons.cost}
              placeholder="Add Cost Per Person"
              value={formData.costPerPerson || ""}
              onChange={handleChange}
              name="costPerPerson"
              type="number"
              parentClassName="h-10"
              className="text-xl placeholder:text-xl font-medium leading-loose"
            />

            <ToggleInput
              icon={icons.sunrise}
              text="Outdoor"
              name="isOutdoor"
              isToggled={formData.isOutdoor}
              onChange={handleToggleChange}
            />

            <ChipsList
              selectedChips={formData.chips}
              onChange={handleChipsChange}
            />

            <TextArea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Add a description of your event"
            />
          </div>
          </div>

          <div className="flex flex-col space-y-3 pt-0 md:pt-28">
            {/* Moved onchange and imageUrl props to image picker component */}
            <ImageUpload
              showImagePicker={handleShowImagePicker}
              imageURL={formData.imageUrl}
            />

            <ToggleInput
              name="isPublic"
              text="Public Event"
              isToggled={formData.isPublic}
              onChange={handleToggleChange}
            />

            <ToggleInput
              name="requireGuestApproval"
              text="Require Guest Approval"
              isToggled={formData.requireGuestApproval}
              onChange={handleToggleChange}
            />

            <RSVP
              requireGuestApproval={formData.requireGuestApproval}
              selectedRVSPMoods={formData.rsvpMoods}
              onChange={handleRSVPMoodChange}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="px-6 py-2 h-16 bg-[#084be7] text-white text-center text-base font-bold leading-normal w-max inline self-end rounded-none"
        >
          Done
        </Button>
      </form>
      {isSidebarOpen && (
  <div  id="settings-sidebar"className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
    {/* Sidebar container (80% of the screen width) */}
    <div className="w-[80%] h-full  bg-transparent  backdrop-blur-[50px] p-8 relative text-white overflow-auto shadow-lg">
      {/* Close Button */}
      <button
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
        <button className="bg-[rgba(255,255,255,0.40)]  text-gray-300  p-3  text-left w-[150px]">
          🎟 Ticket Cost
        </button>
        <button className="bg-[rgba(174,171,171,0.30)] text-gray-400 p-3 text-left w-[150px]">
          👥 Invite Guests
        </button>
      </div>
      
      {/* Start Ticket Type & Price Section */}
      <div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Friendship Contribution</h3>
        <p className="text-sm text-gray-300">
          For the Guest Approval: The payment amount will be <br/> confirmed after approval.
        </p>

        {/* Start Ticket Name & Type */}
        
          <div className="flex items-center space-x-12 mt-5 ">
            <span className="w-[200px] text-gray-300 p-3 bg-[rgba(255,255,255,0.40)]">Ticket Name</span>
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
          {["Apple Pay", "Paypal", "Bank Transfer", "Credit Card"].map((method) => (
            <div key={method} className="flex items-center justify-between bg-[rgba(255,255,255,0.40)] p-3 w-[450px]">
              <span className="text-gray-300">{method}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-[rgba(255,255,255,0.40)] peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      </div>
      {/*  End Payment Methods Section */}


       {/* Start  Price Section */}
       <div className="flex flex-col  items-end  justify-between  space-x-3  p-3 ">
            <select className="text-white p-3  bg-[rgba(255,255,255,0.40)] w-[200px]">
              <option>🎟  Support Our Event</option>
              <option>Free</option>
              <option>🎟  Standard Ticket</option>
            </select>
             {/* Save Changes Button (Bottom Right) */}
            
              <Button className="bg-blue-600 px-3 py-6 text-white font-semibold w-[150px] rounded-none ">
                Save Changes
              </Button>
            
       </div>
          {/* End Price Section */}
      </div>

     
    </div>
  </div>
)}





    </div>
  );
};

export default EventForm;
