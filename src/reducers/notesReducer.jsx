import { v4 as uuid } from "uuid";

export const initialState = {
  title: "",
  text: "",
  notes: [],
  archive: [],
  trash: [],
  search: "",
};

export function notesReducer(state, { type, payload }) {
  switch (type) {
    case "TITLE":
      return { ...state, title: payload };
    case "TEXT":
      return { ...state, text: payload };
    case "SEARCH":
      return { ...state, search: payload };
    case "ADD_NOTE": {
      const title = state.title.trim();
      const text = state.text.trim();
      if (!title && !text) return state;
      return {
        ...state,
        notes: [
          {
            id: uuid(),
            title: title || "Untitled note",
            text,
            isPinned: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          ...state.notes,
        ],
        title: "",
        text: "",
      };
    }
    case "EDIT_NOTE": {
      const update = (items) =>
        items.map((note) =>
          note.id === payload.id
            ? {
                ...note,
                title: payload.title.trim() || "Untitled note",
                text: payload.text.trim(),
                updatedAt: new Date().toISOString(),
              }
            : note,
        );
      return {
        ...state,
        notes: update(state.notes),
        archive: update(state.archive),
      };
    }
    case "CLEAR_INPUT":
      return { ...state, title: "", text: "" };
    case "PIN":
    case "UNPIN":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === payload.id ? { ...note, isPinned: type === "PIN" } : note,
        ),
        archive: state.archive.map((note) =>
          note.id === payload.id ? { ...note, isPinned: type === "PIN" } : note,
        ),
      };
    case "ADD_TO_ARCHIVE": {
      const note = state.notes.find((item) => item.id === payload.id);
      if (!note) return state;
      return {
        ...state,
        notes: state.notes.filter((item) => item.id !== payload.id),
        archive: [{ ...note, isPinned: false }, ...state.archive],
      };
    }
    case "REMOVE_FROM_ARCHIVE": {
      const note = state.archive.find((item) => item.id === payload.id);
      if (!note) return state;
      return {
        ...state,
        archive: state.archive.filter((item) => item.id !== payload.id),
        notes: [note, ...state.notes],
      };
    }
    case "MOVE_TO_TRASH": {
      const note = [...state.notes, ...state.archive].find(
        (item) => item.id === payload.id,
      );
      if (!note) return state;
      return {
        ...state,
        notes: state.notes.filter((item) => item.id !== payload.id),
        archive: state.archive.filter((item) => item.id !== payload.id),
        trash: [
          { ...note, deletedAt: new Date().toISOString() },
          ...state.trash,
        ],
      };
    }
    case "RESTORE_NOTE": {
      const note = state.trash.find((item) => item.id === payload.id);
      if (!note) return state;
      const { deletedAt, ...restored } = note;
      return {
        ...state,
        trash: state.trash.filter((item) => item.id !== payload.id),
        notes: [restored, ...state.notes],
      };
    }
    case "DELETE_PERMANENTLY":
      return {
        ...state,
        trash: state.trash.filter((item) => item.id !== payload.id),
      };
    case "EMPTY_TRASH":
      return { ...state, trash: [] };
    default:
      return state;
  }
}
