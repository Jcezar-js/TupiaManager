import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { materialService } from "../../services/material.service";
import type { Material, MaterialFormData } from "../../types/material";
import {
  MaterialFormSchema,
  MATERIAL_CATEGORIES,
  MATERIAL_UNITS,
} from "../../types/material";
import { ErrorDisplay } from "../shared/ErrorDisplay";
import { isApiError } from "@/services/api";

interface MaterialFormProps {
  initialData?: Material;
  onSuccess?: () => void;
}

export function MaterialForm({ initialData, onSuccess }: MaterialFormProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<MaterialFormData>({
    name: "",
    category: "madeira",
    unit: "metro",
    pricePerUnit: 0,
    wasteFactor: 1.1,
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  useEffect(() => {
    if (initialData) {
  // eslint-disable-next-line react-hooks/set-state-in-effect
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
    setGeneralError("");

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
      setFormData({
        name: "",
        category: "madeira",
        unit: "metro",
        pricePerUnit: 0,
        wasteFactor: 1.1,
      });
      onSuccess?.();
      navigate("/admin/materials");
    } catch (err) {
      if (isApiError(err) && err.fieldErrors) {
        setErrors(err.fieldErrors);
      } else {
        setGeneralError(
          err instanceof Error ? err.message : "Erro ao salvar material",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 520 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {id ? "Editar Material" : "Novo Material"}
        </Typography>

        {generalError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {generalError}
          </Alert>
        )}

        <ErrorDisplay errors={errors} />

        <Stack component="form" onSubmit={handleSubmit} spacing={2.5}>
          <TextField
            id="name"
            label="Nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <TextField
            id="category"
            label="Categoria"
            select
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target
                  .value as (typeof MATERIAL_CATEGORIES)[number],
              })
            }
          >
            {MATERIAL_CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="unit"
            label="Unidade"
            select
            value={formData.unit}
            onChange={(e) =>
              setFormData({
                ...formData,
                unit: e.target.value as (typeof MATERIAL_UNITS)[number],
              })
            }
          >
            {MATERIAL_UNITS.map((unit) => (
              <MenuItem key={unit} value={unit}>
                {unit}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="price"
            label="Preço por Unidade (R$)"
            type="number"
            slotProps={{ htmlInput: { step: "0.01" } }}
            value={formData.pricePerUnit}
            onChange={(e) =>
              setFormData({
                ...formData,
                pricePerUnit: parseFloat(e.target.value) || 0,
              })
            }
          />

          <TextField
            id="waste"
            label="Fator de Desperdício"
            type="number"
            slotProps={{ htmlInput: { step: "0.01" } }}
            value={formData.wasteFactor}
            onChange={(e) =>
              setFormData({
                ...formData,
                wasteFactor: parseFloat(e.target.value) || 1.1,
              })
            }
          />

          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/admin/materials")}
            >
              Cancelar
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
