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

// Load projects from JSON file
const projectsPath = path.resolve("scripts/projects.json");
const projectsFromJson = JSON.parse(fs.readFileSync(projectsPath, "utf-8"));

async function clearAndSeedProjects() {
  try {
    console.log("🚀 Starting projects clear and seed operation...\n");

    // 1. Delete all existing projects
    console.log("🗑️  Deleting all existing projects from Firebase...");
    const existingProjects = await getDocs(collection(db, "projects"));
    let deletedCount = 0;
    
    for (const docSnapshot of existingProjects.docs) {
      await deleteDoc(doc(db, "projects", docSnapshot.id));
      console.log(`  ✓ Deleted: ${docSnapshot.id}`);
      deletedCount++;
    }
    
    if (deletedCount === 0) {
      console.log("  (No existing projects found)");
    }
    console.log(`✅ Deleted ${deletedCount} projects!\n`);

    // 2. Push all projects from JSON
    console.log("📋 Pushing projects from projects.json...");
    for (const projectData of projectsFromJson) {
      const dataWithDefaults = {
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true,
        ...projectData
      };
      await setDoc(doc(db, "projects", projectData.id), dataWithDefaults);
      console.log(`  ✓ Added: ${projectData.title} (${projectData.status})`);
    }
    console.log(`\n✅ Successfully added ${projectsFromJson.length} projects!\n`);

    console.log("🎉 Projects clear and seed operation completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`  ✓ Deleted ${deletedCount} old projects`);
    console.log(`  ✓ Added ${projectsFromJson.length} new projects from JSON`);
    console.log("\n💡 Your projects.json is now live in Firebase!");

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

// Run it
clearAndSeedProjects().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
