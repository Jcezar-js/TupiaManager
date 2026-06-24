import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CatalogGrid } from '../components/catalog/CatalogGrid';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

export function CatalogPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ py: 4 }}>
        <Box sx={{ maxWidth: 1152, mx: 'auto', px: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                Catálogo de Produtos
              </Typography>
              <Typography color="text.secondary">
                Confira nossos produtos e calcule seu orçamento
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LoginIcon />}
              onClick={() => navigate('/login')}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Acesso Admin
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ pb: 6 }}>
        <CatalogGrid />
      </Box>
    </Box>
  );
}
