import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CatalogGrid } from '../components/catalog/CatalogGrid';

export function CatalogPage() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ py: 4 }}>
        <Box sx={{ maxWidth: 1152, mx: 'auto', px: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Catálogo de Produtos
          </Typography>
          <Typography color="text.secondary">
            Confira nossos produtos e calcule seu orçamento
          </Typography>
        </Box>
      </Box>
      <Box sx={{ pb: 6 }}>
        <CatalogGrid />
      </Box>
    </Box>
  );
}
