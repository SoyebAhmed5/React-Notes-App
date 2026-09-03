const notesReducer = (state, { type, payload }) => {
    switch (type) {
        case "TITLE":
            return { ...state, title: payload };
        case "TEXT":
            return { ...state, text: payload };
        case "ADD_NOTE":
            return { ...state, notes: [...state.notes, { title: state.title, text: state.text }], title: '', text: '' };
        case "CLEAR_FIELDS":
            return { ...state, title: '', text: '' };
        default:
            return state;
    }
}

export default notesReducer;