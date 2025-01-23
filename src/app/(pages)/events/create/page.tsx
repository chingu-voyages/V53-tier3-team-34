"use client";
import EventForm from "@/createEvent/templates/EventForm";
import { SessionProvider } from "next-auth/react";
import React from "react";

const CreateEvent = () => {
  return (
    <SessionProvider>
      <EventForm />
    </SessionProvider>
  );
};

export default CreateEvent;
