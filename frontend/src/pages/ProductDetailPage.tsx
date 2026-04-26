import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/catalog')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    );
  }

  const currentPhoto = product.photos[photoIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate('/catalog')}
          className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Voltar ao Catálogo
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Photo Gallery */}
          <div>
            {currentPhoto ? (
              <div>
                <img
                  src={currentPhoto}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg mb-4"
                />
                {product.photos.length > 1 && (
                  <div className="flex gap-2">
                    {product.photos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPhotoIndex(idx)}
                        className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                          idx === photoIndex ? 'border-blue-600' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${product.name} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Sem imagem</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Especificações</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Altura:</span>
                  <span className="font-semibold">
                    {product.constraints.minHeight}mm - {product.constraints.maxHeight}mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Largura:</span>
                  <span className="font-semibold">
                    {product.constraints.minWidth}mm - {product.constraints.maxWidth}mm
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profundidade:</span>
                  <span className="font-semibold">
                    {product.constraints.minDepth}mm - {product.constraints.maxDepth}mm
                  </span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Componentes:</span>
                  <span className="font-semibold">{product.components.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Calculator */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <QuoteCalculator product={product} />
        </div>
      </div>
    </div>
  );
}
