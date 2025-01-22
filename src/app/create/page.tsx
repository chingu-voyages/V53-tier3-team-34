"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import EventForm from "../../createEvent/templates/EventForm";
import { ThemeProvider } from "./provider";

const CreateEvent = () => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <EventForm />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default CreateEvent;
