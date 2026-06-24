import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import type { Product } from '../../types/index';

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
  const isMock = String(product._id).startsWith('mock-');

  const handleClick = () => {
    if (isMock) {
      return;
    }
    navigate(`/catalog/${product._id}`);
  };

  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      {isMock && (
        <Chip
          label="Exemplo"
          size="small"
          sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
        />
      )}
      <CardActionArea
        onClick={handleClick}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          pointerEvents: isMock ? 'none' : 'auto',
          opacity: isMock ? 0.6 : 1,
        }}
      >
        {product.photos && product.photos.length > 0 ? (
          <CardMedia component="img" height="192" image={product.photos[0]} alt={product.name} />
        ) : (
          <Box
            sx={{
              height: 192,
              bgcolor: 'grey.200',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="text.disabled">Sem imagem</Typography>
          </Box>
        )}

        <CardContent>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
