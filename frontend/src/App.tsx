import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/shared/Navbar';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

// Placeholder pages (to be created in later phases)
const LoginPage = () => <div className="p-4">Login Page</div>;
const CatalogPage = () => <div className="p-4">Catalog Page</div>;
const ProductDetailPage = () => <div className="p-4">Product Detail Page</div>;
const MaterialsPage = () => <div className="p-4">Materials Page</div>;
const ProductsPage = () => <div className="p-4">Products Page</div>;

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<ProductDetailPage />} />

          <Route
            path="/admin/materials"
            element={
              <ProtectedRoute>
                <MaterialsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/materials/new"
            element={
              <ProtectedRoute>
                <MaterialsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/materials/:id/edit"
            element={
              <ProtectedRoute>
                <MaterialsPage />
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

          <Route path="/" element={<Navigate to="/catalog" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
