import { BsList, BsBellFill, BsPersonCircle } from 'react-icons/bs';
import { useAuth } from '../../contexts/AuthContext';

const TOPBAR_STYLE: React.CSSProperties = {
  height: 'var(--admin-topbar-height)',
  backgroundColor: 'var(--admin-topbar-bg)',
  position: 'fixed',
  top: 0,
  left: 'var(--admin-sidebar-width)',
  right: 0,
  zIndex: 1030,
};

interface AdminTopbarProps {
  title: string;
}

export function AdminTopbar({ title }: AdminTopbarProps) {
  const { logout } = useAuth();

  return (
    <header
      style={TOPBAR_STYLE}
      className="d-flex align-items-center justify-content-between px-4 border-bottom border-secondary"
    >
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-sm btn-outline-secondary border-0 text-white p-1" aria-label="Toggle sidebar">
          <BsList size={20} />
        </button>
        <span className="text-white fw-semibold">{title}</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        <BsBellFill size={16} className="text-secondary" />
        <BsPersonCircle size={20} className="text-white" />
        <button className="btn btn-sm btn-outline-light" onClick={logout}>
          Sair
        </button>
      </div>
    </header>
  );
}
