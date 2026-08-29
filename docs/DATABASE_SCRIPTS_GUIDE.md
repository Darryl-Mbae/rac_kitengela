# Database Management Scripts Guide

Complete guide for managing all database content (Events, Projects, Board Members) in your Rotaract Kitengela application.

## Quick Reference

| Task | Command | Description |
|------|---------|-------------|
| **Events** | | |
| Seed all events | `npm run seed:events` | Replace all events with `events.json` |
| Add single event | `npm run add:event` | Add one event without overwriting others |
| **Projects** | | |
| Seed all projects | `npm run seed:projects` | Replace all projects with `projects.json` |
| Add single project | `npm run add:project` | Add one project without overwriting others |
| **Board Members** | | |
| Seed board members | `npm run seed` | Also runs with `seed:boardmembers` |
| Initial Firebase setup | `npm run seed` | Sets up all initial data |

## File Structure

```
scripts/
├── seedEvents.ts              # Seeds all events
├── seedProjects.ts            # Seeds all projects
├── clearAndSeedBoardMembers.ts # Seeds board members
├── seedFirebase.ts            # Master seed script
├── addEvent.ts                # Add single event
├── addProject.ts              # Add single project
├── events.json                # Event data
├── projects.json              # Project data
└── boardMembers.json          # Board member data
```

## Collections Structure

### Events Collection (`events`)
- **Where**: Firestore → `events` collection
- **Data file**: `scripts/events.json`
- **Seed script**: `scripts/seedEvents.ts`
- **Add script**: `scripts/addEvent.ts`

**Document fields:**
- `title` (string) - Event name
- `description` (string) - Event details
- `date` (Timestamp) - Event date/time
- `location` (string) - Where it's happening
- `category` (string) - Club Hangout, Mentorship, Community Service, Club Projects
- `image` (string) - Event image URL
- `registrationLink` (string) - Google Form link
- `driveLink` (string) - Drive folder link

**Display in app**: `/pages/Events.tsx` and `/pages/Projects.tsx`

### Projects Collection (`projects`)
- **Where**: Firestore → `projects` collection
- **Data file**: `scripts/projects.json`
- **Seed script**: `scripts/seedProjects.ts`
- **Add script**: `scripts/addProject.ts`

**Document fields:**
- `id` (string) - Unique project identifier
- `title` (string) - Project name
- `description` (string) - Short description
- `details` (string) - Long description
- `status` (string) - In Progress, Completed, Ongoing, Planning
- `tags` (array) - Project categories
- `icon` (string) - Lucide React icon name
- `color` (string) - Tailwind gradient class
- `highlight` (string) - Key metric/achievement
- `image` (string) - Project image URL
- `startDate` (string) - YYYY-MM-DD format
- `estimatedCompletion` (string|null) - YYYY-MM-DD or null
- `budget` (number) - Project budget
- `location` (string) - Project location
- `partners` (array) - Partner organizations

**Display in app**: `/pages/Projects.tsx` → `SignatureProjectsList`

### Board Members Collection (`boardMembers`)
- **Where**: Firestore → `boardMembers` collection
- **Data file**: `scripts/boardMembers.json`
- **Seed script**: `scripts/clearAndSeedBoardMembers.ts`

**Display in app**: `/pages/Leadership.tsx`

## Workflow Examples

### Example 1: Initial Setup

1. Make sure all JSON files have correct data
2. Run all seeds:
   ```bash
   npm run seed              # Seeds events, projects, and board members
   npm run seed:events       # Or individually
   npm run seed:projects
   npm run seed              # For board members
   ```
3. Check Firebase Console to verify data
4. Refresh app to see changes

### Example 2: Add New Event During Season

1. Don't want to replace all events? Use add:event
   ```bash
   npm run add:event
   ```
2. Edit the `newEvent` object in `scripts/addEvent.ts`
3. Save and run the command
4. Get the Firebase document ID from console output
5. Refresh your app

### Example 3: Update Project Status

**Option A: Using projects.json (replaces all)**
1. Open `scripts/projects.json`
2. Find the project and update `status`
3. Run `npm run seed:projects`
4. Refresh app

**Option B: Using Firebase Console (manual)**
1. Go to Firebase Console
2. Navigate to `projects` collection
3. Click on the project document
4. Edit the `status` field
5. Save - app updates automatically on refresh

### Example 4: Add Multiple Events at Once

1. Open `scripts/events.json`
2. Add multiple event objects to the array:
   ```json
   {
     "title": "Event 1",
     "date": "2026-12-01T18:30:00Z",
     // ... other fields
   },
   {
     "title": "Event 2",
     "date": "2026-12-08T19:00:00Z",
     // ... other fields
   }
   ```
3. Run `npm run seed:events`
4. All old events are replaced, new ones added

## Data Formats

### Date Format (Events)
Events in `events.json` use ISO 8601 format with UTC timezone:
```json
"date": "2026-12-15T18:30:00Z"
```

Events in TypeScript use JavaScript Date:
```typescript
date: new Date(2026, 11, 15, 18, 30, 0)  // Year, Month (0-11), Day, Hour, Minute, Second
```

Firebase stores as Timestamp, but the app converts to JavaScript Date automatically.

### Date Format (Projects)
Projects use simple date strings:
```json
"startDate": "2026-01-15",
"estimatedCompletion": "2026-12-31"
```

Use `null` if no end date:
```json
"estimatedCompletion": null
```

## Important Notes

### ⚠️ Seeding Replaces All Data
When you run `seed:*` commands, **all existing documents in that collection are deleted first**:
- `npm run seed:events` → Deletes all events, then adds from JSON
- `npm run seed:projects` → Deletes all projects, then adds from JSON

**Always backup your JSON files before seeding!**

### ✅ Adding Preserves Existing Data
When you run `add:*` commands, existing data is preserved:
- `npm run add:event` → Keeps all events, adds one new one
- `npm run add:project` → Keeps all projects, adds one new one

### 🔄 Real-time Updates
- Events and Projects load on component mount
- Changes made in Firebase appear in the app on page refresh
- To see live updates, implement real-time listeners (consider for future)

## Modifying Scripts

### To change seed data location:
Edit the path in the script:
```typescript
const projectsPath = path.resolve("scripts/projects.json");
```

### To add new fields to projects:
1. Add field to `projects.json`
2. Update `ProjectInput` interface in `addProject.ts`
3. Update `projects.json` schema documentation
4. Run seed to apply changes

### To add validation:
Add checks before Firebase call:
```typescript
if (!newProject.title) {
  console.error("Project title is required");
  process.exit(1);
}
```

## Firebase Configuration

All scripts use the same Firebase config defined in each file:
- **Project ID**: `rac-kitengela`
- **Auth Domain**: `rac-kitengela.firebaseapp.com`
- **Storage Bucket**: `rac-kitengela.appspot.com`

To use different Firebase project, update the `firebaseConfig` object in each script.

## Troubleshooting

### Script won't run
```bash
# Make sure tsx is installed
npm install

# Try running with explicit path
npx tsx scripts/seedProjects.ts

# Check Node version (needs 16+)
node --version
```

### Firebase connection fails
- Check internet connection
- Verify API keys in script are correct
- Check Firebase Console -> Database is active
- Ensure Firestore Rules allow writes (for local testing)

### Data not appearing in app
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors
- Verify document IDs match collection names
- Check Firebase Console -> Collections exist

### Timestamps are wrong
- Ensure dates in `events.json` are ISO 8601 format
- Remember JavaScript months are 0-indexed (January = 0)
- Use UTC timezone (`Z` at end of ISO string)

## Advanced: Real-time Listeners

Currently, data is fetched once on component mount. For live updates, implement listeners:

```typescript
import { collection, onSnapshot } from "firebase/firestore";

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
    const events = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
    setEvents(events);
  });

  return unsubscribe;
}, []);
```

## Security Considerations

⚠️ **WARNING**: Firebase API keys in scripts are public. This is OK for development, but:

**For production:**
1. Use environment variables
2. Use Firebase Admin SDK (server-side only)
3. Set proper Firestore security rules
4. Restrict API keys to specific operations

## Next Steps

1. Test seeding with sample data
2. Add real events and projects
3. Implement real-time listeners for live updates
4. Consider adding validation in the UI
5. Set up proper Firebase security rules
6. Document any custom fields you add
