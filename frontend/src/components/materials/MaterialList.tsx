import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlusCircle } from 'react-icons/bs';
import type { Material } from '../../types/material';
import { materialService } from '../../services/material.service';
import { Pagination } from '../shared/Pagination';
import { DeleteMaterialModal } from './DeleteMaterialModal';

const CATEGORY_LABELS: Record<string, string> = {
  madeira: 'Madeira',
  vidro: 'Vidro',
  metal: 'Metal',
  plastico: 'Plástico',
  tecido: 'Tecido',
  outro: 'Outro',
};

const UNIT_LABELS: Record<string, string> = {
  metro: 'm',
  metro2: 'm²',
  metro3: 'm³',
  unidade: 'un',
  kg: 'kg',
};

export function MaterialList() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchDebounce, setSearchDebounce] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ material: Material; open: boolean }>({
    material: null!,
    open: false,
  });

  const loadMaterials = useCallback(async () => {
    try {
      setLoading(true);
      const result = await materialService.listMaterials(page, 20, searchDebounce);
      setMaterials(result.data);
      setTotalPages(result.pagination.pages);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar materiais');
    } finally {
      setLoading(false);
    }
  }, [page, searchDebounce]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounce(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadMaterials();
  }, [loadMaterials]);

  const handleDelete = async () => {
    try {
      await materialService.deleteMaterial(deleteModal.material._id);
      setDeleteModal({ material: null!, open: false });
      loadMaterials();
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar material');
    }
  };

  if (loading && materials.length === 0) {
    return <div className="text-center py-4">Carregando...</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Materiais</h5>
          <button
            onClick={() => navigate('/admin/materials/new')}
            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
          >
            <BsPlusCircle size={16} /> Novo Material
          </button>
        </div>

        <input
          type="text"
          placeholder="Buscar material..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control mb-3"
        />

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Unidade</th>
                <th className="text-end">Preço</th>
                <th className="text-end">Desperdício</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material._id}>
                  <td>{material.name}</td>
                  <td>{CATEGORY_LABELS[material.category]}</td>
                  <td>{UNIT_LABELS[material.unit]}</td>
                  <td className="text-end">R$ {material.pricePerUnit.toFixed(2)}</td>
                  <td className="text-end">{material.wasteFactor.toFixed(2)}x</td>
                  <td className="text-center">
                    <button
                      onClick={() => navigate(`/admin/materials/${material._id}/edit`)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setDeleteModal({ material, open: true })}
                      className="btn btn-danger btn-sm"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {materials.length === 0 && !loading && (
          <div className="text-center py-4 text-muted">Nenhum material encontrado</div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

        <DeleteMaterialModal
          isOpen={deleteModal.open}
          material={deleteModal.material}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal({ material: null!, open: false })}
        />
      </div>
    </div>
  );
}
