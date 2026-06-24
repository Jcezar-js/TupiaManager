import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Stack from "@mui/material/Stack";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import type { Material } from "../../types/material";
import { materialService } from "../../services/material.service";
import { Pagination } from "../shared/Pagination";
import { DeleteMaterialModal } from "./DeleteMaterialModal";
import { isApiError } from "@/services/api";

const CATEGORY_LABELS: Record<string, string> = {
  madeira: "Madeira",
  vidro: "Vidro",
  metal: "Metal",
  plastico: "Plástico",
  tecido: "Tecido",
  outro: "Outro",
};

const UNIT_LABELS: Record<string, string> = {
  metro: "m",
  metro2: "m²",
  metro3: "m³",
  unidade: "un",
  kg: "kg",
};

export function MaterialList() {
  const navigate = useNavigate();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    material: Material;
    open: boolean;
  }>({
    material: null!,
    open: false,
  });

  const loadMaterials = useCallback(async () => {
    try {
      setLoading(true);
      const result = await materialService.listMaterials(
        page,
        20,
        searchDebounce,
      );
      setMaterials(result.data);
      setTotalPages(result.pagination.pages);
      setError("");
    } catch (err) {
      setError(isApiError(err) ? err.message || "fallback" : "fallback");
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMaterials();
  }, [loadMaterials]);

  const handleDelete = async () => {
    try {
      await materialService.deleteMaterial(deleteModal.material._id);
      setDeleteModal({ material: null!, open: false });
      loadMaterials();
    } catch (err) {
      setError(isApiError(err) ? err.message || "fallback" : "fallback");
    }
  };

  if (loading && materials.length === 0) {
    return (
      <Typography align="center" sx={{ py: 4 }}>
        Carregando...
      </Typography>
    );
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6">Materiais</Typography>
          <Button
            variant="contained"
            size="small"
            startIcon={<AddCircleIcon />}
            onClick={() => navigate("/admin/materials/new")}
          >
            Novo Material
          </Button>
        </Box>

        <TextField
          placeholder="Buscar material..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2 }}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Unidade</TableCell>
                <TableCell align="right">Preço</TableCell>
                <TableCell align="right">Desperdício</TableCell>
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material._id} hover>
                  <TableCell>{material.name}</TableCell>
                  <TableCell>{CATEGORY_LABELS[material.category]}</TableCell>
                  <TableCell>{UNIT_LABELS[material.unit]}</TableCell>
                  <TableCell align="right">
                    R$ {material.pricePerUnit.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {material.wasteFactor.toFixed(2)}x
                  </TableCell>
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          navigate(`/admin/materials/${material._id}/edit`)
                        }
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => setDeleteModal({ material, open: true })}
                      >
                        Deletar
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {materials.length === 0 && !loading && (
          <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
            Nenhum material encontrado
          </Typography>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />

        <DeleteMaterialModal
          isOpen={deleteModal.open}
          material={deleteModal.material}
          onConfirm={handleDelete}
          onCancel={() => setDeleteModal({ material: null!, open: false })}
        />
      </CardContent>
    </Card>
  );
}
