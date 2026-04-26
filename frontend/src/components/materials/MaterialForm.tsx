import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { materialService } from '../../services/material.service';
import type { Material, MaterialFormData } from '../../types/material';
import { MaterialFormSchema, MATERIAL_CATEGORIES, MATERIAL_UNITS } from '../../types/material';
import { ErrorDisplay } from '../shared/ErrorDisplay';

interface MaterialFormProps {
  initialData?: Material;
  onSuccess?: () => void;
}

export function MaterialForm({ initialData, onSuccess }: MaterialFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<MaterialFormData>({
    name: '',
    category: 'madeira',
    unit: 'metro',
    pricePerUnit: 0,
    wasteFactor: 1.1,
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        unit: initialData.unit,
        pricePerUnit: initialData.pricePerUnit,
        wasteFactor: initialData.wasteFactor,
      });
    } else if (id) {
      materialService.getMaterial(id).then((material) => {
        setFormData({
          name: material.name,
          category: material.category,
          unit: material.unit,
          pricePerUnit: material.pricePerUnit,
          wasteFactor: material.wasteFactor,
        });
      });
    }
  }, [initialData, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    const result = MaterialFormSchema.safeParse(formData);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await materialService.updateMaterial(id, result.data);
      } else {
        await materialService.createMaterial(result.data);
      }
      setFormData({ name: '', category: 'madeira', unit: 'metro', pricePerUnit: 0, wasteFactor: 1.1 });
      onSuccess?.();
      navigate('/admin/materials');
    } catch (err: any) {
      if (err.fieldErrors) {
        setErrors(err.fieldErrors);
      } else {
        setGeneralError(err.message || 'Erro ao salvar material');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm" style={{ maxWidth: '520px' }}>
      <div className="card-body">
        <h5 className="card-title">{id ? 'Editar Material' : 'Novo Material'}</h5>

        {generalError && <div className="alert alert-danger">{generalError}</div>}

        <ErrorDisplay errors={errors} />

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="name" className="form-label">
              Nome
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-control"
            />
          </div>

          <div>
            <label htmlFor="category" className="form-label">
              Categoria
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="form-select"
            >
              {MATERIAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="unit" className="form-label">
              Unidade
            </label>
            <select
              id="unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })}
              className="form-select"
            >
              {MATERIAL_UNITS.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="price" className="form-label">
              Preço por Unidade (R$)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              value={formData.pricePerUnit}
              onChange={(e) => setFormData({ ...formData, pricePerUnit: parseFloat(e.target.value) || 0 })}
              className="form-control"
            />
          </div>

          <div>
            <label htmlFor="waste" className="form-label">
              Fator de Desperdício
            </label>
            <input
              id="waste"
              type="number"
              step="0.01"
              value={formData.wasteFactor}
              onChange={(e) => setFormData({ ...formData, wasteFactor: parseFloat(e.target.value) || 1.1 })}
              className="form-control"
            />
          </div>

          <div className="d-flex gap-2">
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button type="button" onClick={() => navigate('/admin/materials')} className="btn btn-secondary">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
