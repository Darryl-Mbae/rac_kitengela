import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import * as fs from "fs";
import * as path from "path";

// Firebase configuration (same as in your app)
const firebaseConfig = {
  apiKey: "AIzaSyDHGG3V3d1kvnVVZQyHcEp6AtQWqsBVgQA",
  authDomain: "rac-kitengela.firebaseapp.com",
  projectId: "rac-kitengela",
  storageBucket: "rac-kitengela.firebasestorage.app",
  messagingSenderId: "785602631075",
  appId: "1:785602631075:web:6d689ad7fd3f0c7c5b3616",
  measurementId: "G-NQD6DV4KT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load board members from JSON file
const boardMembersPath = path.resolve("scripts/boardMembers.json");
const boardMembersFromJson = JSON.parse(fs.readFileSync(boardMembersPath, "utf-8"));

// Placeholder image URL (using a public image URL)
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1540575467063-178f50c1dff2?w=800&h=600&fit=crop";

async function seedFirebase() {
  try {
    console.log("🚀 Starting Firebase seeding...\n");

    // 1. Add Slogan
    console.log("📝 Adding slogan...");
    await setDoc(doc(db, "settings", "slogan"), {
      text: "Service Above Self",
      updatedAt: new Date(),
    });
    console.log("✅ Slogan added successfully!\n");

    // 2. Add Upcoming Event
    console.log("🎬 Adding upcoming event...");
    await setDoc(doc(db, "settings", "upcomingEvent"), {
      title: "Spider-Man: Brand New Day",
      description: "Join the Rotaract Club of Kitengela for an unforgettable movie night! Enjoy Spider-Man: Brand New Day while supporting meaningful community projects. A portion of every ticket purchased helps fund our service initiatives, youth programs, and outreach activities.",
      image: PLACEHOLDER_IMAGE,
      date: new Date("2024-12-15"),
      location: "Kitengela Community Center",
      updatedAt: new Date(),
    });
    console.log("✅ Upcoming event added successfully!\n");

    // 3. Add dummy events to the events collection
    console.log("📅 Adding dummy events to collection...");
    const eventsData = [
      {
        title: "Community Cleanup Drive",
        description: "Join us as we clean up the Kitengela community and promote environmental awareness.",
        image: PLACEHOLDER_IMAGE,
        date: new Date("2024-12-10"),
        location: "Kitengela Main Park",
        category: "Environmental",
        createdAt: new Date(),
      },
      {
        title: "Youth Empowerment Workshop",
        description: "A day dedicated to empowering young leaders with professional skills and mentorship.",
        image: PLACEHOLDER_IMAGE,
        date: new Date("2024-12-20"),
        location: "Kitengela Community Hall",
        category: "Youth Development",
        createdAt: new Date(),
      },
      {
        title: "Christmas Charity Drive",
        description: "Help us spread joy this Christmas by participating in our charity donation drive.",
        image: PLACEHOLDER_IMAGE,
        date: new Date("2024-12-25"),
        location: "Multiple locations",
        category: "Charity",
        createdAt: new Date(),
      },
      {
        title: "Professional Development Seminar",
        description: "Learn industry best practices and networking with professionals in various fields.",
        image: PLACEHOLDER_IMAGE,
        date: new Date("2025-01-15"),
        location: "Kitengela Convention Center",
        category: "Professional Development",
        createdAt: new Date(),
      },
      {
        title: "Health and Wellness Fair",
        description: "Free health screenings, fitness activities, and wellness seminars for the community.",
        image: PLACEHOLDER_IMAGE,
        date: new Date("2025-02-01"),
        location: "Kitengela Sports Complex",
        category: "Health & Wellness",
        createdAt: new Date(),
      },
    ];

    for (const eventData of eventsData) {
      const docRef = await addDoc(collection(db, "events"), eventData);
      console.log(`  ✓ Event added: ${eventData.title} (ID: ${docRef.id})`);
    }
    console.log("\n✅ All dummy events added successfully!\n");

    // 4. Add resources to the resources collection
    console.log("📚 Adding resources collection...");
    const resourcesData = [
      {
        id: "four-way-test",
        title: "Four Way Test",
        description: "The Rotary Four Way Test",
        content: `The Four Way Test is a tool to guide Rotarians in their ethical decision-making and behavior. Rotarians pledge to apply it in their professional lives, volunteer work, and personal relationships.

The Four Way Test asks of the things we think, say, or do:

1. Is it the TRUTH?
2. Is it FAIR to all concerned?
3. Will it build GOODWILL and BETTER FRIENDSHIPS?
4. Will it be BENEFICIAL to all concerned?

These four simple questions have guided Rotarians for over 100 years in making ethical decisions and conducting honest business practices.`,
        createdAt: new Date(),
      },
      {
        id: "rotary-grace",
        title: "Rotary Grace",
        description: "Grace said before Rotary meetings",
        content: `O Lord and giver of all good,
We thank Thee for our daily food,
By Rotary's labor, love and care,
God's gifts of service we all share,
May peace abound and strife shall cease,
And all the world be blessed with peace.

This traditional Rotary Grace is often recited at the beginning of Rotary meetings. It reflects the values of service, community, and gratitude that are central to Rotary's mission.`,
        createdAt: new Date(),
      },
      {
        id: "bylaws",
        title: "ByLaws",
        description: "Rotaract Club of Kitengela ByLaws",
        content: `Documents have been moved to external storage. Please click the link above to view the latest version.`,
        documentUrl: "https://via.placeholder.com/bylaws.pdf",
        createdAt: new Date(),
      },
      {
        id: "club-constitution",
        title: "Club Constitution",
        description: "Rotaract Club of Kitengela Constitution",
        content: `Documents have been moved to external storage. Please click the link above to view the latest version.`,
        documentUrl: "https://via.placeholder.com/constitution.pdf",
        createdAt: new Date(),
      },
    ];

    for (const resourceData of resourcesData) {
      await setDoc(doc(db, "resources", resourceData.id), resourceData);
      console.log(`  ✓ Resource added: ${resourceData.title}`);
    }
    console.log("\n✅ All resources added successfully!\n");

    // 5. Delete all existing board members
    console.log("🗑️  Clearing existing board members...");
    const existingMembers = await getDocs(collection(db, "boardMembers"));
    for (const docSnapshot of existingMembers.docs) {
      await deleteDoc(doc(db, "boardMembers", docSnapshot.id));
      console.log(`  ✓ Deleted: ${docSnapshot.id}`);
    }
    console.log("✅ Existing board members cleared!\n");

    // 6. Add board members from JSON file
    console.log("👥 Adding board members from boardMembers.json...");
    for (const memberData of boardMembersFromJson) {
      const dataWithDefaults = {
        bio: "",
        linkedin: "",
        email: "",
        active: true,
        createdAt: new Date(),
        ...memberData
      };
      await setDoc(doc(db, "boardMembers", memberData.id), dataWithDefaults);
      console.log(`  ✓ Board member added: ${memberData.name} (${memberData.role})`);
    }
    console.log("\n✅ All board members added successfully!\n");

    console.log("🎉 Firebase seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log("  ✓ Slogan: 'Service Above Self'");
    console.log("  ✓ Upcoming Event: 'Spider-Man: Brand New Day'");
    console.log("  ✓ 5 dummy events added to 'events' collection");
    console.log("  ✓ 4 resources added: Four Way Test, Rotary Grace, ByLaws, Club Constitution");
    console.log(`  ✓ ${boardMembersFromJson.length} board members added with alternating Cranberry & Gold backgrounds`);
    console.log("\n💡 Tip: Edit boardMembers.json to update names, roles, and IDs, then run 'npm run seed' again!");

  } catch (error) {
    console.error("❌ Error seeding Firebase:", error);
    process.exit(1);
  }
}

// Run the seeding function
seedFirebase().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
