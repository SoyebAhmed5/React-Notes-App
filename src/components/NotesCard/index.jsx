import { useState } from "react";
import {
  FiStar,
  FiArchive,
  FiTrash2,
  FiRotateCcw,
  FiX,
  FiEdit2,
} from "react-icons/fi";

export default function NotesCard({ note, mode = "notes", dispatch }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const submit = () => {
    dispatch({ type: "EDIT_NOTE", payload: { id: note.id, title, text } });
    setEditing(false);
  };
  return (
    <article className={`note-card ${note.isPinned ? "pinned" : ""}`}>
      <div className="note-card-top">
        {editing ? (
          <input
            className="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Edit note title"
          />
        ) : (
          <h3>{note.title}</h3>
        )}
        {mode !== "trash" && (
          <button
            className={`mini-button ${note.isPinned ? "is-pinned" : ""}`}
            title={note.isPinned ? "Unpin note" : "Pin note"}
            aria-label={note.isPinned ? "Unpin note" : "Pin note"}
            onClick={() =>
              dispatch({
                type: note.isPinned ? "UNPIN" : "PIN",
                payload: { id: note.id },
              })
            }>
            <FiStar />
          </button>
        )}
      </div>
      {editing ? (
        <textarea
          className="edit-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label="Edit note content"
        />
      ) : (
        <p className="note-content">
          {note.text || <span className="muted">No additional details</span>}
        </p>
      )}
      <div className="note-meta">
        <span>
          {note.updatedAt
            ? new Date(note.updatedAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })
            : "Just now"}
        </span>
        {note.isPinned && <span className="pinned-label">PINNED</span>}
      </div>
      <div className="note-actions">
        {editing ? (
          <>
            <button className="action-button save" onClick={submit}>
              Save
            </button>
            <button className="action-button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </>
        ) : mode === "trash" ? (
          <>
            <button
              className="action-button"
              onClick={() =>
                dispatch({ type: "RESTORE_NOTE", payload: { id: note.id } })
              }>
              <FiRotateCcw /> Restore
            </button>
            <button
              className="action-button danger"
              onClick={() =>
                dispatch({
                  type: "DELETE_PERMANENTLY",
                  payload: { id: note.id },
                })
              }
              title="Delete permanently">
              <FiX />
            </button>
          </>
        ) : (
          <>
            {mode === "archive" ? (
              <button
                className="action-button"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_FROM_ARCHIVE",
                    payload: { id: note.id },
                  })
                }>
                <FiRotateCcw /> Restore
              </button>
            ) : (
              <button
                className="action-button"
                onClick={() => setEditing(true)}>
                <FiEdit2 /> Edit
              </button>
            )}
            {mode !== "archive" && (
              <button
                className="action-button"
                onClick={() =>
                  dispatch({ type: "ADD_TO_ARCHIVE", payload: { id: note.id } })
                }>
                <FiArchive /> Archive
              </button>
            )}
            <button
              className="action-button danger"
              onClick={() =>
                dispatch({ type: "MOVE_TO_TRASH", payload: { id: note.id } })
              }
              title="Move to trash">
              <FiTrash2 />
            </button>
          </>
        )}
      </div>
    </article>
  );
}
