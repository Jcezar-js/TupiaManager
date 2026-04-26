import { useNavigate } from 'react-router-dom';
import type { Product } from '../../types/index';

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/catalog/${product._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
    >
      {product.photos && product.photos.length > 0 ? (
        <img
          src={product.photos[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Sem imagem</span>
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">
          {product.description}
        </p>
      </div>
    </div>
  );
}
