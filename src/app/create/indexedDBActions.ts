import type { EventFormData } from "../../createEvent/templates/EventForm";

interface IndexedDBEventData extends EventFormData {
  id: number;
}

// Utility function to open IndexedDB
const openIndexedDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("EventFormDB", 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBRequest).result;
      if (!db.objectStoreNames.contains("events")) {
        db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event: Event) =>
      resolve((event.target as IDBRequest).result);
    request.onerror = () => reject("Failed to open IndexedDB");
  });
};

// Save only one event to IndexedDB
export const saveEventToIndexedDB = async (
  eventData: EventFormData,
): Promise<string> => {
  const db = await openIndexedDB();
  const transaction = db.transaction("events", "readwrite");
  const store = transaction.objectStore("events");

  // Clear the existing event (if any) before adding the new one
  store.clear();

  return await new Promise((resolve, reject) => {
    const eventToStore = { ...eventData, id: Date.now() }; // Add a unique ID to each event
    store.put(eventToStore); // Insert the event

    transaction.oncomplete = () => resolve("Event saved");
    transaction.onerror = () => reject("Error saving event");
  });
};

// Get the single event from IndexedDB
export const getEventFromIndexedDB =
  async (): Promise<IndexedDBEventData | null> => {
    const db = await openIndexedDB();
    const transaction = db.transaction("events", "readonly");
    const store = transaction.objectStore("events");
    const request = store.getAll(); // Retrieve all events, but expect only one

    return await new Promise((resolve, reject) => {
      request.onsuccess = () => {
        const result = request.result as IndexedDBEventData[];
        resolve(result.length > 0 ? result[result.length - 1] : null); // Return the last event if exists
      };
      request.onerror = () => reject("Error retrieving event");
    });
  };

// Clear all events from IndexedDB
export const clearIndexedDB = async (): Promise<string> => {
  const db = await openIndexedDB();
  const transaction = db.transaction("events", "readwrite");
  const store = transaction.objectStore("events");
  store.clear();

  return await new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve("IndexedDB cleared");
    transaction.onerror = () => reject("Error clearing IndexedDB");
  });
};
