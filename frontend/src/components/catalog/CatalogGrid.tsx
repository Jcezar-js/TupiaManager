import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { productService } from '../../services/product.service';
import type { Product } from '../../types/index';
import { ProductCard } from './ProductCard';
import { Pagination } from '../shared/Pagination';
import { MOCK_PRODUCTS } from '../../mocks/products.mock';

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
        // Use mock data as fallback
        setProducts(MOCK_PRODUCTS);
        setTotalPages(1);
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
    return (
      <Typography align="center" sx={{ py: 8 }}>
        Carregando produtos...
      </Typography>
    );
  }

  if (!loading && products.length === 0) {
    return (
      <Typography align="center" color="text.secondary" sx={{ py: 12 }}>
        Nenhum produto disponível
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1152, mx: 'auto', px: 2 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {products.map((product) => (
          <Grid key={product._id} size={{ xs: 12, sm: 6, lg: 4 }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </Box>
  );
}
