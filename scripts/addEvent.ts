import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1kwV9bwNV1L9XH73XVJgdKPxR1G1-R4c",
  authDomain: "rac-kitengela.firebaseapp.com",
  projectId: "rac-kitengela",
  storageBucket: "rac-kitengela.appspot.com",
  messagingSenderId: "540532596076",
  appId: "1:540532596076:web:3d86f8e76dd57dd2a69c39"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface EventInput {
  title: string;
  description: string;
  date: Date;
  location: string;
  category: "Club Hangout" | "Community Service" | "Mentorship" | "Club Projects";
  image?: string;
  registrationLink?: string;
  driveLink?: string;
}

/**
 * Add a single event to Firebase
 * 
 * Usage: npx tsx scripts/addEvent.ts
 * 
 * Modify the newEvent object below to add a new event
 */
async function addEvent() {
  try {
    // Modify this object to add a new event
    const newEvent: EventInput = {
      title: "Your Event Title",
      description: "Event description goes here",
      date: new Date(2026, 11, 15, 18, 30, 0), // Year, Month (0-indexed), Day, Hour, Minute, Second
      location: "Event Location",
      category: "Club Hangout",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      registrationLink: "https://docs.google.com/forms/d/YOUR_FORM_ID/viewform",
      driveLink: ""
    };

    console.log("📝 Adding new event...\n");
    console.log(`  Title: ${newEvent.title}`);
    console.log(`  Date: ${newEvent.date.toLocaleDateString()}`);
    console.log(`  Location: ${newEvent.location}`);
    console.log(`  Category: ${newEvent.category}\n`);

    const eventData = {
      ...newEvent,
      date: Timestamp.fromDate(newEvent.date),
      createdAt: new Date()
    };

    const docRef = await addDoc(collection(db, "events"), eventData);
    
    console.log("✅ Event added successfully!");
    console.log(`   Event ID: ${docRef.id}`);
    console.log(`   Title: ${newEvent.title}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding event:", error);
    process.exit(1);
  }
}

addEvent();
