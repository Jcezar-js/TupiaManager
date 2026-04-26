import { useState, useEffect } from 'react';
import { productService } from '../../services/product.service';
import type { Product } from '../../types/index';
import { ProductCard } from './ProductCard';
import { Pagination } from '../shared/Pagination';

export function CatalogGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await productService.listProducts(page, 20, search);
        setProducts(response.data);
        setTotalPages(response.pagination.pages);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  if (loading && products.length === 0) {
    return <div className="text-center py-8">Carregando produtos...</div>;
  }

  if (!loading && products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nenhum produto disponível</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
