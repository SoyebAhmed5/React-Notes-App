import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoArchive } from "react-icons/io5";
import { MdLabelImportant } from "react-icons/md";
import { IoTrashBinSharp } from "react-icons/io5";

const Sidebar = () => {

    const getStyle = ({ isActive}) =>{
        const style=' flex gap-1 items-center px-2 py-1 rounded-tr-full rounded-br-full'
        return isActive?  `bg-blue-500 text-slate-50 ${style}`  : ` hover:bg-blue-500 hover:text-slate-50 ${style}`
    }

  return (
    <aside className="flex flex-col gap-3 border-r-2 border-gray-100 w-[150px] h-screen p-3">
      <NavLink to='/'className={getStyle}>

        <span><FaHome /></span> <span>Home</span>
      </NavLink>
      <NavLink to='/archive' className={getStyle}>
        <span><IoArchive /></span> <span>Archive</span>
      </NavLink>
      <NavLink to='/important' className={getStyle}>
        <span><MdLabelImportant /></span> <span>Important</span>
      </NavLink>
      <NavLink to='/bin' className={getStyle}>
        <span><IoTrashBinSharp /></span> <span>Bin</span>
      </NavLink>
    </aside>
  );
};

export default Sidebar;
