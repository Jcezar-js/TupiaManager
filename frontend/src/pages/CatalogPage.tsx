import { CatalogGrid } from '../components/catalog/CatalogGrid';

export function CatalogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Catálogo de Produtos</h1>
          <p className="text-gray-600">Confira nossos produtos e calcule seu orçamento</p>
        </div>
      </div>
      <div className="pb-12">
        <CatalogGrid />
      </div>
    </div>
  );
}
