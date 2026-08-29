# Projects Management Scripts

This guide explains how to manage projects in Firebase using the provided scripts.

## Overview

Projects are stored in Firebase Firestore under the `projects` collection. There are multiple ways to manage projects:

1. **Seed all projects** - Replace all existing projects with data from `projects.json`
2. **Add individual projects** - Add a single new project to Firebase
3. **Update projects** - Manually via Firebase Console or by modifying and re-seeding

## Project Data Structure

Each project document contains:

```json
{
  "id": "unique-project-id",
  "title": "Project Name",
  "icon": "IconName",
  "description": "Short one-line description",
  "details": "Detailed description of the project",
  "status": "In Progress | Completed | Ongoing | Planning",
  "color": "Tailwind gradient class (e.g., 'from-blue-500 to-cyan-500')",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "highlight": "Key metric or achievement",
  "image": "https://image-url.jpg",
  "startDate": "2026-01-01",
  "estimatedCompletion": "2026-12-31 or null",
  "budget": 450000,
  "location": "Project location",
  "partners": ["Partner 1", "Partner 2"],
  "active": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## Available Scripts

### 1. Seed All Projects

**Command:**
```bash
npm run seed:projects
```

**What it does:**
- Deletes all existing projects from Firebase
- Uploads all projects from `scripts/projects.json`
- Perfect for initial setup or bulk updates

**When to use:**
- First time setup
- Major project structure changes
- Testing with sample data

**Output example:**
```
🚀 Starting projects clear and seed operation...

🗑️  Deleting all existing projects from Firebase...
✅ Deleted 0 projects!

📋 Pushing projects from projects.json...
  ✓ Added: Olmapinu WASH Project (In Progress 2025/2026)
  ✓ Added: Undugu Rescue Center (Completed 2021)
  ✓ Added: Wellness Programs (Ongoing)
  ✓ Added: Hustle Yangu Program (Ongoing)
  ✓ Added: Environmental Conservation Drive (Ongoing)
  ✓ Added: Youth Mentorship Program (Ongoing)

✅ Successfully added 6 projects!
```

### 2. Add Individual Project

**Command:**
```bash
npm run add:project
```

**What it does:**
- Adds a single new project to Firebase
- Preserves all existing projects
- Returns the Firebase document ID

**When to use:**
- Adding a new project one at a time
- Don't want to overwrite existing projects
- Need to add projects while the app is running

**How to use:**
1. Open `scripts/addProject.ts`
2. Modify the `newProject` object with your project details
3. Run `npm run add:project`
4. Check the console output for the document ID

**Example:**
```typescript
const newProject: ProjectInput = {
  id: "clean-energy-initiative-2026",
  title: "Clean Energy Initiative",
  icon: "Zap",
  description: "Solar panel installation for community centers",
  details: "Installing solar panels on 3 community centers to provide sustainable energy",
  status: "Planning",
  color: "from-yellow-500 to-orange-500",
  tags: ["Environment", "Renewable Energy", "Community Service"],
  highlight: "3 Centers",
  image: "https://images.unsplash.com/photo-1559027615-cd2628902d4a",
  startDate: "2026-03-01",
  estimatedCompletion: "2026-09-30",
  budget: 500000,
  location: "Kitengela",
  partners: ["Renewable Energy Africa", "Tech for Good"]
};
```

## Managing projects.json

The `scripts/projects.json` file contains all initial projects. To manage projects:

### Adding Projects to JSON
1. Open `scripts/projects.json`
2. Add a new object to the array:
```json
{
  "id": "unique-id",
  "title": "Project Title",
  // ... other fields
}
```
3. Run `npm run seed:projects` to upload to Firebase

### Modifying Projects in JSON
1. Edit the project object in `scripts/projects.json`
2. Run `npm run seed:projects` to update Firebase (this will overwrite all projects)

### Removing Projects from JSON
1. Delete the project object from `scripts/projects.json`
2. Run `npm run seed:projects` to sync with Firebase

## Project Icons

Available icons from `lucide-react`:
- `Award` - Recognition, achievements
- `Droplets` - Water, WASH projects
- `HeartPulse` - Health, wellness
- `Smile` - Happiness, mental health
- `FolderKanban` - Organization, management
- `Handshake` - Partnerships, collaboration
- `Leaf` - Environment, sustainability
- `CheckCircle2` - Completion, success
- `Zap` - Energy, power
- `Users` - Community, people
- `Target` - Goals, objectives
- `Briefcase` - Professional, business

## Project Status Values

- **In Progress 2025/2026** - Currently being implemented
- **Completed 2021** - Finished in a specific year
- **Ongoing** - Continuous, no end date
- **Planning** - In the planning phase

## Tailwind Gradient Colors

Use Tailwind gradient classes:
- `from-blue-500 to-cyan-500` - Blue to cyan
- `from-rose-500 to-pink-500` - Rose to pink
- `from-purple-500 to-indigo-500` - Purple to indigo
- `from-yellow-500 to-orange-500` - Yellow to orange
- `from-green-500 to-emerald-500` - Green to emerald

## Fetching Projects in Components

```typescript
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function MyComponent() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const fetchedProjects = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    }

    getProjects();
  }, []);

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### Firebase connection error
- Check your Firebase config in the script
- Ensure your Firebase project is active
- Verify API keys have Firestore write permissions

### "projects.json not found"
- Ensure you're running the script from the project root
- Check the file path: `scripts/projects.json`

### Changes not showing in the app
- The app fetches data on component mount
- Try refreshing the page
- Check browser console for errors

## Notes

- Project IDs should be unique and kebab-case (e.g., `olmapinu-wash`)
- Always backup your `projects.json` before running `seed:projects`
- Use `add:project` for individual additions to avoid data loss
- Budget values are in Kenyan Shillings (KES)
