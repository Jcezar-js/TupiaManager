import { useState } from 'react';
import { productService } from '../../services/product.service';
import type { Product, Quote, QuoteRequest } from '../../types/index';

export function QuoteCalculator({ product }: { product: Product }) {
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setQuote(null);

    if (!height || !width || !depth) {
      setError('Preencha todas as dimensões');
      return;
    }

    setLoading(true);
    try {
      const dimensions: QuoteRequest = {
        height: Number(height),
        width: Number(width),
        depth: Number(depth),
      };
      const result = await productService.getProductQuote(product._id, dimensions);
      setQuote(result);
    } catch (err: any) {
      setError(err.message || 'Erro ao calcular orçamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Calcular Orçamento</h2>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Altura (mm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ex: 1800"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo: {product.constraints.minHeight}mm | Máximo: {product.constraints.maxHeight}mm
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Largura (mm)
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Ex: 900"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo: {product.constraints.minWidth}mm | Máximo: {product.constraints.maxWidth}mm
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profundidade (mm)
            </label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              placeholder="Ex: 500"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Mínimo: {product.constraints.minDepth}mm | Máximo: {product.constraints.maxDepth}mm
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Calculando...' : 'Calcular Orçamento'}
        </button>
      </form>

      {quote && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <p className="text-sm text-gray-600 mb-1">Preço Final</p>
            <p className="text-3xl font-bold text-green-700">
              R$ {quote.finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Ficha Técnica</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="text-left py-2 px-3 font-semibold">Material</th>
                    <th className="text-right py-2 px-3 font-semibold">Quantidade</th>
                    <th className="text-left py-2 px-3 font-semibold">Unidade</th>
                    <th className="text-right py-2 px-3 font-semibold">Custo</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.details.technicalSheet.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="py-2 px-3">{item.materialName}</td>
                      <td className="text-right py-2 px-3">{item.quantityConsumed}</td>
                      <td className="py-2 px-3">{item.unit}</td>
                      <td className="text-right py-2 px-3">
                        R$ {parseFloat(item.cost).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total de Materiais:</span>
              <span className="font-semibold">
                R$ {quote.details.totalMaterialCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mão de Obra:</span>
              <span className="font-semibold">
                R$ {quote.details.laborCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Lucro:</span>
              <span className="font-semibold">
                R$ {quote.details.profit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
