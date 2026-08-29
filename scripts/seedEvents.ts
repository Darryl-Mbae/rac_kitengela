import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, addDoc, Timestamp } from 'firebase/firestore';

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

const newEvents = [
  {
    title: "Monthly General Meeting",
    description: "Join us for our regular monthly meeting to discuss club initiatives, vote on matters, and strengthen our fellowship.",
    date: Timestamp.fromDate(new Date(2026, 8, 15, 18, 30, 0)),
    location: "Rotaract Kitengela Venue",
    category: "Club Hangout",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example1/viewform",
    driveLink: ""
  },
  {
    title: "Hustle Yangu Professional Development",
    description: "Pitch competition and mentorship sessions for young entrepreneurs. Network with seasoned professionals and investors.",
    date: Timestamp.fromDate(new Date(2026, 9, 1, 14, 0, 0)),
    location: "Nairobi Innovation Hub",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example2/viewform",
    driveLink: ""
  },
  {
    title: "Community Cleanup Drive",
    description: "Help us make Kitengela cleaner and greener. We'll be cleaning up public spaces and planting trees.",
    date: Timestamp.fromDate(new Date(2026, 9, 8, 9, 0, 0)),
    location: "Kitengela Community Park",
    category: "Community Service",
    image: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example3/viewform",
    driveLink: ""
  },
  {
    title: "Wellness Saturday Session",
    description: "Mental health and self-care workshop. Learn techniques for stress management and building resilience.",
    date: Timestamp.fromDate(new Date(2026, 9, 12, 10, 0, 0)),
    location: "Community Center",
    category: "Club Projects",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example4/viewform",
    driveLink: ""
  },
  {
    title: "Leadership Training Workshop",
    description: "Develop your leadership skills through interactive sessions and group discussions.",
    date: Timestamp.fromDate(new Date(2026, 9, 20, 15, 0, 0)),
    location: "RAC Kitengela Office",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example5/viewform",
    driveLink: ""
  },
  {
    title: "Olmapinu WASH Project Site Visit",
    description: "Visit the ongoing WASH project at Olmapinu Comprehensive School. See the impact we're making.",
    date: Timestamp.fromDate(new Date(2026, 9, 25, 10, 0, 0)),
    location: "Olmapinu Comprehensive School",
    category: "Community Service",
    image: "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example6/viewform",
    driveLink: ""
  },
  {
    title: "Social Networking Dinner",
    description: "Casual gathering for members to network, share experiences, and strengthen bonds.",
    date: Timestamp.fromDate(new Date(2026, 10, 5, 18, 0, 0)),
    location: "Downtown Nairobi Restaurant",
    category: "Club Hangout",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561118?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example7/viewform",
    driveLink: ""
  },
  {
    title: "Corporate Partnership Meeting",
    description: "Explore collaboration opportunities with corporate partners for mutual benefit.",
    date: Timestamp.fromDate(new Date(2026, 10, 10, 14, 30, 0)),
    location: "Corporate Office",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example8/viewform",
    driveLink: ""
  },
  {
    title: "Youth Empowerment Workshop",
    description: "Empower youth in Kitengela with skills training and career guidance sessions.",
    date: Timestamp.fromDate(new Date(2026, 10, 15, 9, 0, 0)),
    location: "Kitengela Youth Center",
    category: "Community Service",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example9/viewform",
    driveLink: ""
  },
  {
    title: "Environmental Conservation Drive",
    description: "Join us in a tree planting initiative to combat climate change in our region.",
    date: Timestamp.fromDate(new Date(2026, 10, 20, 8, 0, 0)),
    location: "Kitengela Forest Reserve",
    category: "Club Projects",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example10/viewform",
    driveLink: ""
  },
  {
    title: "Charity Fundraiser Gala",
    description: "Evening gala to raise funds for our community projects. Enjoy dinner, entertainment, and networking.",
    date: Timestamp.fromDate(new Date(2026, 10, 28, 19, 0, 0)),
    location: "Five Star Hotel",
    category: "Club Projects",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example11/viewform",
    driveLink: ""
  },
  {
    title: "Professional Skills Development Seminar",
    description: "Learn in-demand professional skills from industry experts. Topics include communication, leadership, and digital skills.",
    date: Timestamp.fromDate(new Date(2026, 11, 5, 10, 0, 0)),
    location: "Training Institute",
    category: "Mentorship",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    registrationLink: "https://docs.google.com/forms/d/1example12/viewform",
    driveLink: ""
  }
];

async function seedEvents() {
  try {
    console.log("🗑️  Deleting existing events...");
    const querySnapshot = await getDocs(collection(db, "events"));
    
    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(doc(db, "events", docSnap.id));
      console.log(`  ✓ Deleted event: ${docSnap.id}`);
    }
    
    console.log("\n✨ Adding 12 new events...");
    for (const event of newEvents) {
      const docRef = await addDoc(collection(db, "events"), event);
      console.log(`  ✓ Added: ${event.title} (${docRef.id})`);
    }
    
    console.log("\n✅ Events seeded successfully!");
    console.log(`   Total events added: ${newEvents.length}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding events:", error);
    process.exit(1);
  }
}

seedEvents();
