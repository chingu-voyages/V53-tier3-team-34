"use client";

import deleteEventImage from "@/actions/deleteEventImage";
import { Button } from "@/components/ui/button";

interface RemoveEventImageProps {
  eventId: string;
}
const RemoveEventImage: React.FC<RemoveEventImageProps> = ({ eventId }) => {
  const handleRemoveImage = async (eventId: string) => {
    await deleteEventImage(eventId);
  };

  return (
    <Button onClick={() => handleRemoveImage(eventId)}>Remove Image</Button>
  );
};

export default RemoveEventImage;
