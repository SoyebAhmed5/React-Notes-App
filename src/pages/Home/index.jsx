import { useMemo } from "react";
import { FiPlus, FiFeather, FiSearch } from "react-icons/fi";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import NotesCard from "../../components/NotesCard";
import { useNotes } from "../../context/notes-context";

export default function Home({ dark, onToggleTheme, importantOnly = false }) {
  const { title, text, notes, search, notesDispatch } = useNotes();
  const visibleNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          (!importantOnly || note.isPinned) &&
          `${note.title} ${note.text}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [notes, search, importantOnly],
  );
  const pinned = visibleNotes.filter((note) => note.isPinned);
  const others = visibleNotes.filter((note) => !note.isPinned);
  const addNote = (e) => {
    e.preventDefault();
    notesDispatch({ type: "ADD_NOTE" });
  };
  return (
    <>
      <NavBar dark={dark} onToggleTheme={onToggleTheme} />
      <div className="app-layout">
        <SideBar />
        <main className="main-content">
          <section className="welcome-row">
            <div>
              <p className="eyebrow">
                {importantOnly ? "YOUR FAVORITES" : "YOUR PERSONAL SPACE"}
              </p>
              <h1>
                {importantOnly ? "Important notes" : "Good ideas start here."}
              </h1>
              <p className="subtitle">
                {importantOnly
                  ? "The thoughts you’ve starred for quick access."
                  : "Capture a thought before it slips away."}
              </p>
            </div>
            <div className="notes-stat">
              <span>{visibleNotes.length.toString().padStart(2, "0")}</span>
              <small>
                {visibleNotes.length === 1 ? "NOTE" : "NOTES"} IN VIEW
              </small>
            </div>
          </section>
          {!importantOnly && (
            <form className="composer" onSubmit={addNote}>
              <div className="composer-heading">
                <span className="composer-icon">
                  <FiFeather />
                </span>
                <div>
                  <strong>Capture a thought</strong>
                  <p>What's on your mind today?</p>
                </div>
                <span className="composer-hint">NEW NOTE</span>
              </div>
              <input
                value={title}
                onChange={(e) =>
                  notesDispatch({ type: "TITLE", payload: e.target.value })
                }
                placeholder="Give your note a title..."
                aria-label="Note title"
                maxLength={120}
              />
              <textarea
                value={text}
                onChange={(e) =>
                  notesDispatch({ type: "TEXT", payload: e.target.value })
                }
                placeholder="Start writing your thoughts here..."
                aria-label="Note content"
                rows={3}
              />
              <div className="composer-footer">
                <span>{text.length} characters</span>
                <button
                  className="primary-button"
                  type="submit"
                  disabled={!title.trim() && !text.trim()}>
                  <FiPlus /> Add note
                </button>
              </div>
            </form>
          )}
          <div className="notes-heading">
            <div>
              <h2>
                {search
                  ? "Search results"
                  : importantOnly
                    ? "Starred notes"
                    : "Your notes"}
              </h2>
              <span>
                {visibleNotes.length}{" "}
                {visibleNotes.length === 1 ? "note" : "notes"}
              </span>
            </div>
          </div>
          {visibleNotes.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FiSearch />
              </div>
              <h3>
                {search
                  ? "No matching notes"
                  : importantOnly
                    ? "Nothing starred yet"
                    : "A fresh page"}
              </h3>
              <p>
                {search
                  ? "Try another keyword or clear your search."
                  : importantOnly
                    ? "Tap the star on a note to keep it close."
                    : "Your notes will show up here. Add your first thought above."}
              </p>
            </div>
          ) : (
            <>
              {pinned.length > 0 && (
                <section className="note-section">
                  <h3 className="section-label">
                    STARRED <span>{pinned.length}</span>
                  </h3>
                  <div className="notes-grid">
                    {pinned.map((note) => (
                      <NotesCard
                        key={note.id}
                        note={note}
                        dispatch={notesDispatch}
                      />
                    ))}
                  </div>
                </section>
              )}
              {others.length > 0 && (
                <section className="note-section">
                  <h3 className="section-label">
                    {pinned.length ? "OTHER NOTES" : "RECENT NOTES"}{" "}
                    <span>{others.length}</span>
                  </h3>
                  <div className="notes-grid">
                    {others.map((note) => (
                      <NotesCard
                        key={note.id}
                        note={note}
                        dispatch={notesDispatch}
                      />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
          <footer className="page-footer">
            Made for your thoughts <span>✦</span>
          </footer>
        </main>
      </div>
    </>
  );
}
