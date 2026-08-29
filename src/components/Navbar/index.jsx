import logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <header className="flex px-5 py-2 gap-3 border-b-2 border-gray-100 ">
      <div className="w-12">
        <img src={logo} alt="NoteX Logo" className="w-full h-full " />
      </div>
      <h1 className="text-indigo-800 text-4xl font-bold">NoteX</h1>
    </header>
  );
};

export default Navbar;