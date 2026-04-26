import { NavLink } from 'react-router-dom';
import { BsBoxSeam, BsGrid } from 'react-icons/bs';

const SIDEBAR_STYLE: React.CSSProperties = {
  width: 'var(--admin-sidebar-width)',
  minHeight: '100vh',
  backgroundColor: 'var(--admin-sidebar-bg)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1040,
  display: 'flex',
  flexDirection: 'column',
};

export function AdminSidebar() {
  return (
    <nav style={SIDEBAR_STYLE} className="d-flex flex-column">
      <div className="px-3 py-4 border-bottom border-secondary">
        <span className="text-white fw-bold fs-6">NexusAdmin</span>
      </div>

      <ul className="nav flex-column mt-3 px-2">
        <li className="nav-item mb-1">
          <NavLink
            to="/admin/materials"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 ${
                isActive ? 'text-white fw-semibold' : 'text-secondary'
              }`
            }
            style={({ isActive }) =>
              isActive ? { backgroundColor: 'var(--admin-accent)' } : {}
            }
          >
            <BsBoxSeam size={16} />
            Materiais
          </NavLink>
        </li>
        <li className="nav-item mb-1">
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-2 rounded px-3 py-2 ${
                isActive ? 'text-white fw-semibold' : 'text-secondary'
              }`
            }
            style={({ isActive }) =>
              isActive ? { backgroundColor: 'var(--admin-accent)' } : {}
            }
          >
            <BsGrid size={16} />
            Produtos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
