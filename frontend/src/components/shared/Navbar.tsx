import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { token, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Marcenaria do Gaúderio
      </Link>

      <div className="flex gap-6 items-center">
        {token ? (
          <>
            <Link to="/admin/materials" className="hover:text-blue-100">
              Materiais
            </Link>
            <Link to="/admin/products" className="hover:text-blue-100">
              Produtos
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Sair
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded font-medium"
          >
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}
