# Projects Page Features Guide

## Overview
The Projects page now has enhanced navigation with clickable areas and signature project links.

## Features Implemented

### 1. Signature Projects with IDs
Signature projects now have unique IDs that enable navigation from the navbar dropdown:

- `#olmapinu` - Olmapinu WASH Project
- `#undugu` - Undugu Rescue Center  
- `#wellness` - Wellness Programs

**How it works:**
- Clicking "Olmapinu Project" in navbar → `/projects#olmapinu` scrolls to signature projects
- The SignatureProjectsList component is at the top of the page

### 2. Service Areas - Clickable Filters
Service Areas are now interactive and filter projects by tag:

| Area | Filters Projects by Tag | Action |
|------|------------------------|--------|
| Community Service | `Community Service` | Searches & scrolls to projects |
| Professional Development | `Professional Development` | Searches & scrolls to projects |
| Club Service | `Club Service` | Searches & scrolls to projects |

**How it works:**
1. Click on any Service Area card
2. Page automatically filters projects by that tag
3. Scrolls smoothly to the projects section
4. Search box shows the active filter

### 3. Focus Areas - Clickable Filters
Focus Areas are also interactive and filter projects:

| Area | Filters Projects by Tag | Action |
|------|------------------------|--------|
| Environmental Projects | `Environment` | Searches & scrolls to projects |
| Collaborations | `Collaboration` | Searches & scrolls to projects |
| All Projects | Shows all projects | Clears filter, shows all |

**How it works:**
Same as Service Areas - click to filter and auto-scroll.

### 4. Page Structure (Top to Bottom)

```
1. Hero Section
   ↓
2. Signature Projects (with IDs for navbar links)
   - Olmapinu WASH Project (#olmapinu)
   - Undugu Rescue Center (#undugu)
   - Wellness Programs (#wellness)
   ↓
3. Memory Section (Image Grid)
   ↓
4. Service Areas (Clickable Filters)
   - Community Service
   - Professional Development
   - Club Service
   ↓
5. Focus Areas (Clickable Filters)
   - Environmental Projects
   - Collaborations
   - All Projects
   ↓
6. All Projects Section
   - Search box (shows active filter)
   - Status filter dropdown
   - Project cards grid
   - Pagination
```

## Navigation Flow

### From Navbar
```
Navbar → Projects Dropdown
  ├─ Signature Projects
  │  ├─ Olmapinu Project → /projects#olmapinu
  │  ├─ Undugu Rescue Center → /projects#undugu
  │  └─ Wellness Programs → /projects#wellness
  ├─ Service Areas
  │  ├─ Community Service → /projects (filters by Community Service)
  │  ├─ Professional Development → /projects (filters by Professional Development)
  │  └─ Club Service → /projects (filters by Club Service)
  └─ Focus Areas
     ├─ Environmental Projects → /projects (filters by Environment)
     ├─ Collaborations → /projects (filters by Collaboration)
     └─ All Projects → /projects
```

### From Page Clicks
When you click a Service Area or Focus Area card on the Projects page:
1. The filter tag is applied to the search
2. Page smoothly scrolls to the "All Projects" section
3. Only matching projects are displayed

## Technical Details

### Filter Mapping
The `areaTagMap` object maps area IDs to project tags:

```typescript
const areaTagMap: Record<string, string> = {
  community: "Community Service",
  professional: "Professional Development",
  "club-service": "Club Service",
  environmental: "Environment",
  collaborations: "Collaboration",
};
```

### Smooth Scrolling
The `handleAreaClick` function:
1. Maps the area ID to its corresponding tag
2. Sets the search value to that tag
3. Resets pagination to page 1
4. Scrolls to `.projects-container` with smooth behavior

### Search Includes Tags
The project filtering checks:
- Project title
- Project description
- Project tags (from the database)

So clicking "Environmental Projects" finds all projects with `Environment` tag.

## To Add New Areas

### 1. Add to Service Areas or Focus Areas array
```typescript
{
  id: "new-area",
  title: "New Area Title",
  icon: SomeIcon,
  description: "Description here",
  items: [] // or initiatives: []
}
```

### 2. Add mapping in areaTagMap
```typescript
const areaTagMap: Record<string, string> = {
  // ... existing
  "new-area": "Tag Name To Search For",
};
```

### 3. Update projects.json
Add the tag to project tags:
```json
{
  "tags": ["Tag Name To Search For", "Other Tags"]
}
```

## Notes

- Areas are clickable/interactive (hover effects included)
- Signature projects have IDs for direct navigation
- All filtering preserves the ability to use the search box and status filter
- Smooth scrolling enhances user experience
- Mobile responsive layout for all sections
