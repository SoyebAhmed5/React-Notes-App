import { NavLink } from "react-router-dom";
import { FiHome, FiArchive, FiStar, FiTrash2 } from "react-icons/fi";
import { useNotes } from "../../context/notes-context";

export default function SideBar() {
  const { notes, archive, trash } = useNotes();
  const links = [
    { to: "/", label: "All notes", icon: <FiHome />, count: notes.length },
    {
      to: "/important",
      label: "Important",
      icon: <FiStar />,
      count: notes.filter((n) => n.isPinned).length,
    },
    {
      to: "/archive",
      label: "Archive",
      icon: <FiArchive />,
      count: archive.length,
    },
    {
      to: "/bin",
      label: "Recently deleted",
      icon: <FiTrash2 />,
      count: trash.length,
    },
  ];
  return (
    <aside className="sidebar">
      <p className="sidebar-label">WORKSPACE</p>
      <nav>
        {links.map((link) => (
          <NavLink
            end={link.to === "/"}
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }>
            <span className="nav-icon">{link.icon}</span>
            <span>{link.label}</span>
            {link.count > 0 && <span className="nav-count">{link.count}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="tip-icon">✦</div>
        <strong>A little space to think.</strong>
        <p>Keep your ideas close and your mind clear.</p>
      </div>
    </aside>
  );
}
