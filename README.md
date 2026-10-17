# NoteX — Modern Notes App

A clean, responsive note-taking application built with **React**, **Vite**, and **React Router**. NoteX helps you capture ideas, organize notes, and keep important thoughts easy to find.

## Live demo: https://notexs.netlify.app

## Features

- **Create notes** — Add a title, content, or both.
- **Edit notes** — Update a note inline with Save and Cancel actions.
- **Instant search** — Search note titles and content as you type.
- **Star important notes** — Pin favorite notes for quick access.
- **Archive notes** — Move notes out of the main workspace and restore them later.
- **Trash and recovery** — Move notes to the trash, restore them, or permanently delete them.
- **Light and dark themes** — Switch themes to suit your workspace.
- **Local persistence** — Keep notes and theme preferences after refreshing the browser.
- **Responsive interface** — Layout adapts to desktop, tablet, and mobile screens.
- **Accessibility details** — Form labels, visible keyboard focus, and reduced-motion support.
- **Helpful empty states** — Clear guidance when a list has no notes or a search has no matches.

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | Component-based user interface |
| Vite | Development server and build tooling |
| React Router | Client-side navigation |
| React Context and `useReducer` | Shared state and note actions |
| `localStorage` | Browser-based persistence |
| React Icons | Interface icons |
| CSS | Responsive layout, themes, and visual styling |

## Getting Started

### Prerequisites

Install a current version of [Node.js](https://nodejs.org/) and npm. Use a Node.js version supported by the Vite version in `package.json`.

### 1. Clone or download the project

If you use Git:

```bash
git clone <your-repository-url>
cd Notes-App
```

Or download and extract the project ZIP, then open the project folder in your terminal.

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal (Vite commonly uses `http://localhost:5173`).

### 4. Create a production build

```bash
npm run build
```

To run the configured lint checks:

```bash
npm run lint
```

## App Routes

| Route | Description |
| --- | --- |
| `/` | View, create, search, edit, star, archive, and delete notes |
| `/important` | View starred notes |
| `/archive` | View archived notes and restore them |
| `/bin` | Restore deleted notes or permanently remove them |

## How Notes Are Stored

NoteX stores data in your browser using `localStorage`:

- `notex-state` — notes, archive, and trash data
- `notex-theme` — selected light or dark theme

This means saved notes remain available after a refresh in the **same browser and browser profile**. Data is not automatically synced between devices or users. Clearing the browser's site data may permanently remove locally stored notes, so do not treat this as a cloud backup.

## Project Structure

```text
src/
├── components/
│   ├── Navbar/
│   ├── Sidebar/
│   └── NotesCard/
├── context/
│   └── notes-context.jsx
├── pages/
│   ├── Home/
│   └── Archive/
├── reducers/
│   └── notesReducer.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Usage

1. Enter a title and/or note content in the composer.
2. Select **Add note** to save it.
3. Use the search field to filter notes by title or content.
4. Select the star icon to mark a note as important.
5. Use **Edit** to update a note, or **Archive** to move it out of the main list.
6. Open **Archive** to restore an archived note.
7. Delete a note to move it to the trash. From **Recently deleted**, restore it or permanently delete it.
8. Use the theme control in the top navigation to switch between light and dark modes.

## Current Limitations

- Notes are stored locally and are not synced across devices.
- There is no user authentication or cloud database.
- Permanent deletion cannot be undone.
- A production build and lint checks should be run in the target environment before deployment.

## Future Improvements

- Add labels, tags, and categories.
- Add note colors and custom sorting.
- Add keyboard shortcuts for common actions.
- Add automated tests for reducer actions and UI flows.
- Add optional cloud sync and authentication.
- Add export/import support for backing up notes.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes and test them.
4. Open a pull request with a clear description.

## License

No license has been specified yet. Add a `LICENSE` file before distributing the project under an open-source license.
