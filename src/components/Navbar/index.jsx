import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { useNotes } from "../../context/notes-context";

export default function NavBar({ dark, onToggleTheme }) {
  const { search, notesDispatch } = useNotes();
  return (
    <header className="topbar">
      <a className="brand" href="/" aria-label="NoteX home">
        <span className="brand-mark">N</span>
        <span>
          Note<span className="brand-accent">X</span>
          <small>YOUR THOUGHTS, ORGANIZED</small>
        </span>
      </a>
      <label className="search-box">
        <FiSearch />
        <input
          value={search}
          onChange={(e) =>
            notesDispatch({ type: "SEARCH", payload: e.target.value })
          }
          placeholder="Search your notes..."
          aria-label="Search notes"
        />
        <kbd>⌘ K</kbd>
      </label>
      <button
        className="icon-button theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle color theme"
        title="Toggle theme">
        {dark ? <FiSun /> : <FiMoon />}
      </button>
      <div className="avatar" title="Your workspace">
        S
      </div>
    </header>
  );
}
