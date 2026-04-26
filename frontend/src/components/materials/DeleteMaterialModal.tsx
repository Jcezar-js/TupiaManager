import { useEffect, useState } from 'react';
import type { Material } from '../../types/material';
import type { Product } from '../../types';
import { Modal } from '../shared/Modal';

interface DeleteMaterialModalProps {
  isOpen: boolean;
  material: Material | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteMaterialModal({ isOpen, material, onConfirm, onCancel }: DeleteMaterialModalProps) {
  const [affectedProducts, setAffectedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen || !material) {
      setAffectedProducts([]);
      setConfirmed(false);
      return;
    }

    setLoading(true);
    // Fetch public products endpoint to check for in-use materials
    fetch(`http://localhost:3001/api/products`)
      .then((res) => res.json())
      .then((result) => {
        const affected = result.data.filter((product: Product) =>
          product.components.some((c: any) => c.material === material._id)
        );
        setAffectedProducts(affected);
      })
      .catch((err) => console.error('Failed to check affected products:', err))
      .finally(() => setLoading(false));
  }, [isOpen, material]);

  if (!material) return null;

  const body = (
    <div className="space-y-4">
      {loading ? (
        <p>Verificando uso do material...</p>
      ) : affectedProducts.length > 0 ? (
        <>
          <p className="text-red-600 font-semibold">Este material é utilizado pelos seguintes produtos:</p>
          <ul className="list-disc list-inside space-y-1">
            {affectedProducts.map((product) => (
              <li key={product._id}>{product.name}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600">Deseja confirmar a exclusão mesmo assim?</p>
          {!confirmed && (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Sim, tenho certeza de que desejo deletar este material</span>
            </label>
          )}
        </>
      ) : (
        <p>Tem certeza que deseja deletar este material?</p>
      )}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      title="Deletar Material"
      body={body}
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmText="Deletar"
      cancelText="Cancelar"
    />
  );
}
