"use client";
import React from "react";
import EventForm from "../../createEvent/templates/EventForm";
import { ThemeProvider } from "./provider";

const CreateEvent = () => {
  return (
    <ThemeProvider>
      <EventForm />
    </ThemeProvider>
  );
};

export default CreateEvent;
