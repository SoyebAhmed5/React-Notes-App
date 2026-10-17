import { FiArchive } from "react-icons/fi";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import NotesCard from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";

export default function Archive({ dark, onToggleTheme, trashOnly = false }) {
  const { archive, trash, search, notesDispatch } = useNotes();
  const mode = trashOnly ? "trash" : "archive";
  const items = (trashOnly ? trash : archive).filter((note) =>
    `${note.title} ${note.text}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <NavBar dark={dark} onToggleTheme={onToggleTheme} />
      <div className="app-layout">
        <SideBar />
        <main className="main-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">
                {trashOnly ? "OUT OF SIGHT" : "KEEPING THINGS TIDY"}
              </p>
              <h1>{trashOnly ? "Recently deleted" : "Your archive."}</h1>
              <p className="subtitle">
                {trashOnly
                  ? "Restore notes or remove them permanently."
                  : "Notes you want to keep, just not on your desk."}
              </p>
            </div>
            <div className="notes-stat">
              <span>{items.length.toString().padStart(2, "0")}</span>
              <small>{trashOnly ? "IN TRASH" : "ARCHIVED"}</small>
            </div>
          </section>
          {trashOnly && trash.length > 0 && (
            <div className="trash-toolbar">
              <span>Deleted notes stay here until you remove them.</span>
              <button
                className="action-button danger"
                onClick={() => {
                  if (
                    window.confirm(
                      "Permanently delete all notes in the trash? This cannot be undone.",
                    )
                  )
                    notesDispatch({ type: "EMPTY_TRASH" });
                }}>
                Empty trash
              </button>
            </div>
          )}
          {items.length ? (
            <div className="notes-grid archive-grid">
              {items.map((note) => (
                <NotesCard
                  key={note.id}
                  note={note}
                  mode={mode}
                  dispatch={notesDispatch}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">
                <FiArchive />
              </div>
              <h3>
                {search
                  ? "No matching notes"
                  : trashOnly
                    ? "Trash is empty"
                    : "Nothing archived yet"}
              </h3>
              <p>
                {search
                  ? "Try a different search term."
                  : trashOnly
                    ? "Notes you delete will appear here."
                    : "Archive notes to keep your workspace calm and clutter-free."}
              </p>
            </div>
          )}
          <footer className="page-footer">
            Made for your thoughts <span>✦</span>
          </footer>
        </main>
      </div>
    </>
  );
}
