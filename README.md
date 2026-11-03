# Calendar Planner

A lightweight browser-based calendar planner built with HTML, CSS, and vanilla JavaScript. It lets users move between months and save notes or plans against individual dates.

## Features

- Displays the current month and year.
- Navigate to the previous or next month.
- Select a date to open a notes dialog.
- Save, edit, or delete a note for a selected date.
- Marks dates that have saved notes.
- Stores notes in the browser's `localStorage`.

## Project files

```text
.
├── index.html   # Calendar structure and notes dialog
├── index.css    # Calendar and dialog styling
├── index.js     # Calendar rendering and note storage
└── README.md
```

## Run locally

No build tools or package installation are required.

1. Clone the repository.
2. Open `index.html` in a modern web browser.
3. Select a date, enter a note, and save it.

You can also serve the folder with a local development server if preferred.

## Data storage

Notes are stored in the browser's `localStorage` under the `calendarNotes` key. They remain available in the same browser profile between visits, but they are not synchronized across devices or browsers. Clearing the browser's site data may remove saved notes.

## Limitations

- This is a front-end learning project; it has no backend or user accounts.
- Notes are stored only in the local browser.
- There is no cloud backup or cross-device synchronization.
