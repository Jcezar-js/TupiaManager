import { Routes, Route, Navigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ProtectedRoute } from './components/shared/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { MaterialsPage } from './pages/MaterialsPage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ChangePasswordPage } from './pages/ChangePasswordPage';
const ProductsPage = () => (
  <AdminLayout title="Produtos">
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Produtos
        </Typography>
        <Typography color="text.secondary">Em breve</Typography>
      </CardContent>
    </Card>
  </AdminLayout>
);

function LoginRoute() {
  const { token } = useAuth();
  if (token) {
    return <Navigate to="/admin/materials" replace />;
  }
  return <LoginPage />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/catalog/:id" element={<ProductDetailPage />} />

      <Route
        path="/admin/materials"
        element={
          <ProtectedRoute>
            <AdminLayout title="Materiais">
              <MaterialsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/materials/new"
        element={
          <ProtectedRoute>
            <AdminLayout title="Novo Material">
              <MaterialsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/materials/:id/edit"
        element={
          <ProtectedRoute>
            <AdminLayout title="Editar Material">
              <MaterialsPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/new"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products/:id/edit"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/change-password"
        element={
          <ProtectedRoute>
            <AdminLayout title="Trocar Senha">
              <ChangePasswordPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/catalog" replace />} />
    </Routes>
  );
}

export default App;
