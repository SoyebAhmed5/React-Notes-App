import { createContext, useContext, useEffect, useReducer } from "react";
import { notesReducer, initialState } from "../reducers/notesReducer";

const NotesContext = createContext(null);

function loadState() {
  try {
    const saved = localStorage.getItem("notex-state");
    return saved
      ? { ...initialState, ...JSON.parse(saved), title: "", text: "" }
      : initialState;
  } catch {
    return initialState;
  }
}

export function NotesProvider({ children }) {
  const [state, notesDispatch] = useReducer(notesReducer, undefined, loadState);

  useEffect(() => {
    const { title, text, ...persistedState } = state;
    localStorage.setItem("notex-state", JSON.stringify(persistedState));
  }, [state]);

  return (
    <NotesContext.Provider value={{ ...state, notesDispatch }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used inside NotesProvider");
  return context;
}
