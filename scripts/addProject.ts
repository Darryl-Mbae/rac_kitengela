import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

interface ProjectInput {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string;
  status: "In Progress" | "Completed" | "Ongoing" | "Planning";
  color: string;
  tags: string[];
  highlight: string;
  image?: string;
  startDate: string;
  estimatedCompletion?: string | null;
  budget: number;
  location: string;
  partners: string[];
}

/**
 * Add a single project to Firebase
 * 
 * Usage: npx tsx scripts/addProject.ts
 * 
 * Modify the newProject object below to add a new project
 */
async function addProject() {
  try {
    // Modify this object to add a new project
    const newProject: ProjectInput = {
      id: "new-project-2026",
      title: "New Project Title",
      icon: "Award",
      description: "Short description of the project",
      details: "Detailed description of what this project aims to achieve",
      status: "Planning",
      color: "from-green-500 to-emerald-500",
      tags: ["Community Service", "Environment"],
      highlight: "Key achievement or metric",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
      startDate: "2026-01-01",
      estimatedCompletion: "2026-12-31",
      budget: 100000,
      location: "Kitengela",
      partners: ["Partner Organization"]
    };

    console.log("📋 Adding new project...\n");
    console.log(`  Title: ${newProject.title}`);
    console.log(`  ID: ${newProject.id}`);
    console.log(`  Status: ${newProject.status}`);
    console.log(`  Start Date: ${newProject.startDate}`);
    console.log(`  Budget: KES ${newProject.budget.toLocaleString()}\n`);

    const projectData = {
      ...newProject,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true
    };

    const docRef = await addDoc(collection(db, "projects"), projectData);
    
    console.log("✅ Project added successfully!");
    console.log(`   Document ID: ${docRef.id}`);
    console.log(`   Title: ${newProject.title}`);
    console.log(`   Status: ${newProject.status}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding project:", error);
    process.exit(1);
  }
}

addProject();
