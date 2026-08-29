import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";
import * as fs from "fs";
import * as path from "path";

// Firebase configuration
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

async function clearAndSeed() {
  try {
    console.log("🚀 Starting clear and seed operation...\n");

    // 1. Delete all existing board members
    console.log("🗑️  Deleting all existing board members from Firebase...");
    const existingMembers = await getDocs(collection(db, "boardMembers"));
    let deletedCount = 0;
    
    for (const docSnapshot of existingMembers.docs) {
      await deleteDoc(doc(db, "boardMembers", docSnapshot.id));
      console.log(`  ✓ Deleted: ${docSnapshot.id}`);
      deletedCount++;
    }
    
    if (deletedCount === 0) {
      console.log("  (No existing board members found)");
    }
    console.log(`✅ Deleted ${deletedCount} board members!\n`);

    // 2. Push all board members from JSON
    console.log("👥 Pushing board members from boardMembers.json...");
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
      console.log(`  ✓ Added: ${memberData.name} (${memberData.role}) - ID: ${memberData.id}`);
    }
    console.log(`\n✅ Successfully added ${boardMembersFromJson.length} board members!\n`);

    console.log("🎉 Clear and seed operation completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`  ✓ Deleted ${deletedCount} old board members`);
    console.log(`  ✓ Added ${boardMembersFromJson.length} new board members from JSON`);
    console.log("\n💡 Your boardMembers.json is now live in Firebase!");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Run it
clearAndSeed().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
