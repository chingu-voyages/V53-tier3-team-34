"use client";
import type React from "react";
import { useState } from "react";
import styles from "../../styles/Event.module.css";
// import Image from 'next/image';

const EventPage = () => {
  interface FormData {
    dateTime: string;
    partyReason: string;
    guestName: string;
    hostName: string;
    numGuests: string;
    address: string;
    costPerPerson: string;
    eventDescription: string;
    outdoor: boolean;
    publicEvent: boolean;
    guestApproval: boolean;
    rsvpStatus: {
      attending: boolean;
      maybe: boolean;
      regretfully: boolean;
    };
  }

  // Initialize state for the form data
  const [formData, setFormData] = useState<FormData>({
    dateTime: "",
    partyReason: "",
    guestName: "",
    hostName: "",
    numGuests: "",
    address: "",
    costPerPerson: "",
    eventDescription: "",
    outdoor: false,
    publicEvent: false,
    guestApproval: false,
    rsvpStatus: {
      attending: false,
      maybe: false,
      regretfully: false,
    },
  });

  // Handle input changes for form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle RSVP status changes
  const handleRsvpChange = (status: keyof typeof formData.rsvpStatus) => {
    setFormData((prevState) => ({
      ...prevState,
      rsvpStatus: {
        ...prevState.rsvpStatus,
        [status]: !prevState.rsvpStatus[status],
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      dateTime: formData.dateTime,
      partyReason: formData.partyReason,
      guestName: formData.guestName,
      hostName: formData.hostName,
      numGuests: formData.numGuests,
      address: formData.address,
      costPerPerson: formData.costPerPerson,
      eventDescription: formData.eventDescription,
      outdoor: formData.outdoor,
      publicEvent: formData.publicEvent,
      guestApproval: formData.guestApproval,
      rsvpStatus: formData.rsvpStatus,
    };

    try {
      const response = await fetch("/api/save-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Event saved successfully:", data);
      } else {
        console.error("Error saving event:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className={`${styles.container} bg-black text-white`}>
      <header
        className={`${styles.header} flex justify-between items-center bg-red-600 p-4`}
      >
        <h1 className={`${styles.logo} text-2xl font-bold`}>Partiyo</h1>
        <button
          type="button"
          className={`${styles.signInButton} bg-blue-600 text-white py-2 px-4 rounded-md`}
        >
          Sign In
        </button>
      </header>

      <main className="flex mt-8 p-4">
        {/* Left Panel */}
        <section
          className={`${styles.leftPanel} relative shadow-lg p-6 rounded-md w-1/2 max-w-lg mb-8`}
        >
          {/* Top Menu */}
          <div
            className={`${styles.topMenu} absolute top-[-40px] left-0 right-0 bg-black bg-opacity-70 flex justify-around p-2 rounded-t-md`}
          >
            <button
              type="button"
              className={`${styles.menuButton} text-white bg-transparent border-none py-2 px-4 cursor-pointer hover:bg-gray-700 rounded-md`}
            >
              Style
            </button>
            <button
              type="button"
              className={`${styles.menuButton} text-white bg-transparent border-none py-2 px-4 cursor-pointer hover:bg-gray-700 rounded-md`}
            >
              Setting
            </button>
            <button
              type="button"
              className={`${styles.menuButton} text-white bg-transparent border-none py-2 px-4 cursor-pointer hover:bg-gray-700 rounded-md`}
            >
              Review
            </button>
          </div>

          <h2 className={`${styles.title} text-xl font-bold mb-4 bg-green-800`}>
            *Untitled Event
          </h2>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="dateTime" className="block text-sm mb-2">
                *Select a Date and Time...
              </label>
              <input
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleInputChange}
                className={`${styles.input} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
              />
            </div>

            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="partyReason" className="block text-sm mb-2">
                For The Reason for The Party
              </label>
              <input
                type="text"
                name="partyReason"
                value={formData.partyReason}
                onChange={handleInputChange}
                placeholder="Reason for the party"
                className={`${styles.input} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
              />
            </div>

            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="guestName" className="block text-sm mb-2">
                Honor of Guest (Option: Name)
              </label>
              <input
                type="text"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                placeholder="Name of Guest"
                className={`${styles.input} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
              />
            </div>

            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="hostName" className="block text-sm mb-2">
                Hosted By (Option: Name)
              </label>
              <input
                type="text"
                name="hostName"
                value={formData.hostName}
                onChange={handleInputChange}
                placeholder="Name of Host"
                className={`${styles.input} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
              />
            </div>

            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="numGuests" className="block text-sm mb-2">
                Bring Guest (Number)
              </label>
              <input
                type="number"
                name="numGuests"
                value={formData.numGuests}
                onChange={handleInputChange}
                placeholder="Number of Guests"
                className={`${styles.input} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
              />
            </div>

            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="address" className="block text-sm mb-2">
                Address or Postcode
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address or Postcode"
                className={`${styles.input} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
              />
            </div>

            <div
              className={`${styles.switchGroup} flex items-center mt-4 bg-green-800`}
            >
              <label htmlFor="outdoor" className="mr-2">
                Outdoor
              </label>
              <input
                type="checkbox"
                name="outdoor"
                checked={formData.outdoor}
                onChange={handleInputChange}
                className={`${styles.checkbox} ml-2`}
              />
            </div>

            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="costPerPerson" className="block text-sm mb-2">
                $ Number Cost Per Person
              </label>
              <input
                type="number"
                name="costPerPerson"
                value={formData.costPerPerson}
                onChange={handleInputChange}
                placeholder="Cost Per Person"
                className={`${styles.input} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
              />
            </div>

            <div className={`${styles.formGroup} mt-4 bg-green-800`}>
              <label htmlFor="eventDescription" className="block text-sm mb-2">
                Add a description of your event
              </label>
              <textarea
                name="eventDescription"
                value={formData.eventDescription}
                onChange={handleInputChange}
                placeholder="Event Description"
                className={`${styles.textarea} w-full p-2 bg-green-800 text-white border border-green-400 rounded-md`}
                rows={4}
              />
            </div>

            <button
              type="button"
              className={`${styles.doneButton} bg-red-600 text-white py-2 px-4 rounded-md mt-6`}
            >
              Save Event
            </button>
          </form>
        </section>

        {/* Right Panel */}
        <section
          className={`${styles.rightPanel} shadow-lg p-6 rounded-md w-1/2 max-w-lg`}
        >
          {/* <Image
            src="#"
            alt="Event Image"
            className={`${styles.eventImage} w-full h-1/2 rounded-md`}
          /> */}
          <button
            type="button"
            className={`${styles.changeImageButton} bg-blue-600 text-white py-2 px-4 rounded-md mt-2`}
          >
            Change
          </button>

          <div
            className={`${styles.switchGroup} flex items-center mt-4 bg-green-800`}
          >
            <label htmlFor="publicEvent" className="mr-2">
              Public Event
            </label>
            <input
              type="checkbox"
              name="publicEvent"
              checked={formData.publicEvent}
              onChange={handleInputChange}
              className={`${styles.checkbox} ml-2`}
            />
          </div>

          <div
            className={`${styles.switchGroup} flex items-center mt-4 bg-green-800`}
          >
            <label htmlFor="guestApproval" className="mr-2">
              Require Guest Approval
            </label>
            <input
              type="checkbox"
              name="guestApproval"
              checked={formData.guestApproval}
              onChange={handleInputChange}
              className={`${styles.checkbox} ml-2`}
            />
          </div>

          <div className={`${styles.rsvpGroup} bg-green-800`}>
            <h3 className={`${styles.rsvpTitle} text-lg font-bold mt-6`}>
              RSVP
            </h3>
            <div className={`${styles.rsvpButtons} flex justify-around mt-4`}>
              <button
                type="button"
                className={`${styles.rsvpButton} text-center cursor-pointer`}
                onClick={() => handleRsvpChange("attending")}
              >
                <div
                  className={`${styles.emojiCircle} bg-gray-600 w-12 h-12 flex items-center justify-center rounded-full text-xl`}
                >
                  ➕
                </div>
                <span>
                  {formData.rsvpStatus.attending ? "Unattending" : "Attending"}
                </span>
              </button>
              <button
                type="button"
                className={`${styles.rsvpButton} text-center cursor-pointer`}
                onClick={() => handleRsvpChange("maybe")}
              >
                <div
                  className={`${styles.emojiCircle} bg-gray-600 w-12 h-12 flex items-center justify-center rounded-full text-xl`}
                >
                  😐
                </div>
                <span>{formData.rsvpStatus.maybe ? "Maybe not" : "Maybe"}</span>
              </button>
              <button
                type="button"
                className={`${styles.rsvpButton} text-center cursor-pointer`}
                onClick={() => handleRsvpChange("regretfully")}
              >
                <div
                  className={`${styles.emojiCircle} bg-gray-600 w-12 h-12 flex items-center justify-center rounded-full text-xl`}
                >
                  😢
                </div>
                <span>
                  {formData.rsvpStatus.regretfully
                    ? "Unregretfully"
                    : "Regretfully"}
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EventPage;
