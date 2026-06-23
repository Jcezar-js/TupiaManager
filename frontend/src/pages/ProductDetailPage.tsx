import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { productService } from '../services/product.service';
import type { Product } from '../types/index';
import { QuoteCalculator } from '../components/catalog/QuoteCalculator';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (!id) {
      navigate('/catalog');
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productService.getProduct(id);
        setProduct(data);
      } catch (err: any) {
        setError(err.message || 'Produto não encontrado');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">Carregando produto...</Typography>
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Typography color="error">{error}</Typography>
          <Button variant="contained" onClick={() => navigate('/catalog')}>
            Voltar ao Catálogo
          </Button>
        </Stack>
      </Box>
    );
  }

  const currentPhoto = product.photos[photoIndex];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
      <Box sx={{ maxWidth: 1152, mx: 'auto', px: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/catalog')} sx={{ mb: 3 }}>
          Voltar ao Catálogo
        </Button>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Photo Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            {currentPhoto ? (
              <Box>
                <Box
                  component="img"
                  src={currentPhoto}
                  alt={product.name}
                  sx={{ width: '100%', height: 384, objectFit: 'cover', borderRadius: 2, mb: 2 }}
                />
                {product.photos.length > 1 && (
                  <Stack direction="row" spacing={1}>
                    {product.photos.map((photo, idx) => (
                      <Box
                        key={idx}
                        component="button"
                        onClick={() => setPhotoIndex(idx)}
                        sx={{
                          p: 0,
                          width: 64,
                          height: 64,
                          borderRadius: 1,
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: '2px solid',
                          borderColor: idx === photoIndex ? 'primary.main' : 'grey.300',
                          bgcolor: 'transparent',
                        }}
                      >
                        <Box
                          component="img"
                          src={photo}
                          alt={`${product.name} ${idx + 1}`}
                          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    ))}
                  </Stack>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: 384,
                  bgcolor: 'grey.200',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="text.disabled">Sem imagem</Typography>
              </Box>
            )}
          </Grid>

          {/* Product Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {product.name}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: '1.1rem', mb: 3 }}>
              {product.description}
            </Typography>

            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Especificações
              </Typography>
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Altura:</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {product.constraints.minHeight}mm - {product.constraints.maxHeight}mm
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Largura:</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {product.constraints.minWidth}mm - {product.constraints.maxWidth}mm
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Profundidade:</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    {product.constraints.minDepth}mm - {product.constraints.maxDepth}mm
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography color="text.secondary">Componentes:</Typography>
                  <Typography sx={{ fontWeight: 600 }}>{product.components.length}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Quote Calculator */}
        <Paper sx={{ p: 4 }}>
          <QuoteCalculator product={product} />
        </Paper>
      </Box>
    </Box>
  );
}
