# Resource Modal Implementation Guide

## Overview

The footer now has a dynamic resource modal system that displays different resources when clicked. Resources can be easily managed through Firebase.

## Components

### 1. ResourceModal.tsx
- Located in `src/components/ResourceModal.tsx`
- Displays a beautifully styled modal with animations
- Features:
  - Smooth fade and scale animations
  - Backdrop that closes on click
  - Scrollable content area
  - Close button in header and footer
  - Responsive design

### 2. useResources Hook
- Located in `src/hooks/useResources.ts`
- Fetches resources from Firebase Firestore
- Features:
  - Fallback to default resources if Firebase is unavailable
  - Loading and error states
  - Easy to integrate into any component

### 3. Updated Footer
- Now displays interactive resource links
- Clicking any resource opens the modal with that resource's content
- Integrated with Firebase data

## How It Works

### 1. Resource Data Structure (Firebase)
Each resource document should have:
```json
{
  "id": "unique-identifier",
  "title": "Resource Title",
  "description": "Short description (optional)",
  "content": "Full content of the resource",
  "createdAt": "timestamp"
}
```

### 2. Adding a New Resource

**Via Firebase Console:**
1. Go to Firestore Database
2. Create a document in the `resources` collection
3. Set the document ID (e.g., "my-resource")
4. Add fields: `id`, `title`, `description`, `content`

**Example:**
```json
{
  "id": "terms-of-service",
  "title": "Terms of Service",
  "description": "Our terms and conditions",
  "content": "Full terms of service text here..."
}
```

**Via Code (Seed Script):**
Edit `scripts/seedFirebase.ts` and add to `resourcesData` array, then run:
```bash
npm run seed
```

### 3. Default Resources

If Firebase is unavailable, these resources are used:
- Four Way Test
- Rotary Grace
- ByLaws

Update these in `src/hooks/useResources.ts` as needed.

## Usage

### In Footer
Resources automatically appear as clickable items in the footer:

```tsx
<li 
  className="cursor-pointer hover:ml-1 transition-all"
  onClick={() => handleResourceClick("resource-id")}
>
  Resource Title
</li>
```

### In Other Components
Use the `useResources` hook:

```tsx
import { useResources } from "../hooks/useResources";

function MyComponent() {
  const { resources, loading, error } = useResources();
  
  return (
    <div>
      {resources.map(resource => (
        <div key={resource.id}>{resource.title}</div>
      ))}
    </div>
  );
}
```

## Styling

### Modal Styling
- Header: Primary color (burgundy) background
- Content: White background with scrollable area
- Footer: Light gray with close button
- Animations: Smooth fade and scale transitions

### Resource Link Styling
- Cursor pointer on hover
- Slight left margin animation on hover
- Smooth transitions

## Features

✅ Dynamic resource management  
✅ Firebase integration  
✅ Fallback to default content  
✅ Smooth animations  
✅ Responsive design  
✅ Scrollable content  
✅ Easy to add new resources  
✅ Reusable component  

## Customization

### Changing Modal Appearance
Edit `src/components/ResourceModal.tsx`:
- Update colors in the header/footer classes
- Modify animation timing in the `motion.div` props
- Adjust sizing with `max-w-2xl` and `max-h-[80vh]`

### Adding More Resources
1. Add to Firebase `resources` collection
2. Add to `DEFAULT_RESOURCES` in `useResources.ts`
3. Add click handler in Footer component

### Custom Animations
The modal uses Framer Motion. Modify these props in `ResourceModal.tsx`:
```tsx
initial={{ opacity: 0, scale: 0.95, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

## Firebase Security Rules

Add these rules to allow reading resources:

```javascript
match /resources/{document=**} {
  allow read;
}
```

## Troubleshooting

### Modal not opening?
- Check browser console for errors
- Verify Firebase is initialized
- Ensure resource ID matches exactly

### Content not displaying?
- Check that `content` field exists in Firebase
- Verify content is properly formatted
- Check for parsing errors in console

### Loading forever?
- Check Firebase connection
- Verify Firestore rules allow reading
- Check network tab for failed requests

## Future Enhancements

- Add pagination for long resources
- Add search/filter functionality
- Add print/download options
- Add translations
- Add categories/tabs
- Add images to resources
