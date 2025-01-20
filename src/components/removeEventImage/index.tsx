"use client";

import deleteEventImage from "@/actions/deleteEventImage";
import { Button } from "@/components/ui/button";

const RemoveEventImage = ({ eventId }: { eventId: string }) => {
  const handleRemoveImage = async (eventId: string) => {
    await deleteEventImage(eventId);
  };

  return (
    <Button onClick={() => handleRemoveImage(eventId)}>Remove Image</Button>
  );
};

export default RemoveEventImage;
