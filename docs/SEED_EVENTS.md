# How to Seed Events

## Files

- **`scripts/seedEvents.ts`** - TypeScript script that deletes all existing events and adds 12 new ones from the JSON file
- **`scripts/events.json`** - JSON file with 12 sample events that you can edit and customize

## Running the Seed Script

### Step 1: Update Events (Optional)
If you want to customize the events, edit `scripts/events.json`:

```json
{
  "title": "Your Event Title",
  "description": "Event description",
  "date": "2026-09-15T18:30:00Z",
  "location": "Event location",
  "category": "Club Hangout|Mentorship|Community Service|Club Projects",
  "image": "https://image-url.com/image.jpg"
}
```

### Step 2: Run the Seed Script

Open your terminal in the project root and run:

```bash
npm run seed:events
```

### What It Does

1. **Deletes all existing events** from the `events` collection in Firebase
2. **Adds 12 new events** from `scripts/events.json` to the database
3. **Logs progress** so you can see what's happening

### Example Output

```
🗑️  Deleting existing events...
  ✓ Deleted event: abc123
  ✓ Deleted event: def456

✨ Adding 12 new events...
  ✓ Added: Monthly General Meeting (new-id-1)
  ✓ Added: Hustle Yangu Professional Development (new-id-2)
  ✓ Added: Community Cleanup Drive (new-id-3)
  ... (9 more events)

✅ Events seeded successfully!
   Total events added: 12
```

## 12 Events Included

1. **Monthly General Meeting** - Club Hangout
2. **Hustle Yangu Professional Development** - Mentorship
3. **Community Cleanup Drive** - Community Service
4. **Wellness Saturday Session** - Club Projects
5. **Leadership Training Workshop** - Mentorship
6. **Olmapinu WASH Project Site Visit** - Community Service
7. **Social Networking Dinner** - Club Hangout
8. **Corporate Partnership Meeting** - Mentorship
9. **Youth Empowerment Workshop** - Community Service
10. **Environmental Conservation Drive** - Club Projects
11. **Charity Fundraiser Gala** - Club Projects
12. **Professional Skills Development Seminar** - Mentorship

## Categories Distribution

- **Club Hangout**: 2 events
- **Mentorship**: 4 events
- **Community Service**: 3 events
- **Club Projects**: 3 events

## Updating Events

To update events:

1. Edit `scripts/events.json` with your changes
2. Run `npm run seed:events` to delete old events and add updated ones

## Customization

### Editing the TypeScript Script

If you need to modify the seed logic, edit `scripts/seedEvents.ts`:

```typescript
const newEvents = [
  {
    title: "Your Event",
    description: "Description",
    date: Timestamp.fromDate(new Date(2026, 8, 15, 18, 30, 0)),
    location: "Location",
    category: "Category",
    image: "Image URL"
  },
  // ... more events
];
```

### Date Format

In TypeScript: `Timestamp.fromDate(new Date(year, month-1, day, hour, minute, second))`

In JSON: ISO 8601 format `"2026-09-15T18:30:00Z"`

## Troubleshooting

### Script won't run

**Error**: `command not found: seed:events`

**Solution**: Check that `package.json` has the npm script:
```json
"scripts": {
  "seed:events": "ts-node scripts/seedEvents.ts"
}
```

If not, add it and run `npm install` again.

### Firebase connection error

**Error**: `Error: Failed to initialize Firebase`

**Solution**: 
- Make sure you have internet connection
- Check Firebase credentials in `seedEvents.ts`
- Verify Firebase project is active

### TypeScript compilation error

**Error**: `error TS2305: Module has no exported member`

**Solution**: 
- Run `npm install` to install dependencies
- Make sure `firebase` is installed: `npm install firebase`

## Pagination Testing

After seeding, test pagination on the Events page:

- **Page 1**: Shows events 1-6
- **Page 2**: Shows events 7-12
- Use the arrow buttons to navigate between pages
- No events should repeat

## Next Steps

1. Run `npm run seed:events` to add 12 events
2. Navigate to `/events` page
3. Test pagination with arrows at the bottom
4. Customize events in `events.json` as needed
5. Re-run seed script whenever you want to update

---

**Last Updated**: Current
