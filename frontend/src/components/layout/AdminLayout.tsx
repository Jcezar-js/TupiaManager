import type { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopbar } from './AdminTopbar';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const contentStyle: React.CSSProperties = {
    marginLeft: 'var(--admin-sidebar-width)',
    marginTop: 'var(--admin-topbar-height)',
    minHeight: 'calc(100vh - var(--admin-topbar-height))',
    backgroundColor: 'var(--admin-content-bg)',
    padding: '24px',
  };

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div style={{ flex: 1, minWidth: 0 }}>
        <AdminTopbar title={title} />
        <main style={contentStyle}>{children}</main>
      </div>
    </div>
  );
}
