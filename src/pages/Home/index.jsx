import { useReducer } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { TbPinnedFilled } from "react-icons/tb";
import { FaArchive } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import notesReducer from "../../reducers/notesReducer";

const Home = () => {
  const initialState = {
    title: "",
    text: "",
    notes: [],
  };

  const [{ title, text, notes }, notesDispatch] = useReducer(
    notesReducer,
    initialState,
  );

  const onTitleChange = (e) => {
    notesDispatch({ type: "TITLE", payload: e.target.value });
  };

  const onTextChange = (e) => {
    notesDispatch({ type: "TEXT", payload: e.target.value });
  };

  const onAddClick = () => {
    notesDispatch({ type: "ADD_NOTE" });

    notesDispatch({ type: "CLEAR_FIELDS" });
  };

  return (
    <>
      <Navbar />
      <main className="flex gap-3">
        <Sidebar />
        <div>
          <div className="flex flex-col w-75 relative">
            <input
              value={title}
              onChange={onTitleChange}
              className="border"
              type="text"
              placeholder="Enter Title"
            />

            <textarea
              value={text}
              onChange={onTextChange}
              className="border"
              placeholder="Enter text"
            />

            <button
              onClick={onAddClick}
              disabled={title.length === 0}
              className="absolute bottom-0 right-0">
              <span>
                <IoMdAddCircle />
              </span>
            </button>
          </div>
          <div className="mt-8">
            {notes?.length > 0 &&
              notes.map(({ id, title, text }) => {
                return (
                  <div
                    key={id}
                    className="w-75 border border-neutral-800 p-2 rounded-md">
                    <div className="flex justify-between">
                      <p>{title}</p>
                      <button>
                        <span>
                          <TbPinnedFilled />
                        </span>
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <p>{text}</p>
                      <div className="ml-auto">
                        <button>
                          <span>
                            <FaArchive />
                          </span>
                        </button>
                        <button>
                          <span>
                            <MdDelete />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
