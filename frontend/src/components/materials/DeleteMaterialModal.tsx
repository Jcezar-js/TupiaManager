import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import type { Material } from "../../types/material";
import type { Component } from "../../types";
import type { Product } from "../../types";
import { Modal } from "../shared/Modal";

interface DeleteMaterialModalProps {
  isOpen: boolean;
  material: Material | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteMaterialModal({
  isOpen,
  material,
  onConfirm,
  onCancel,
}: DeleteMaterialModalProps) {
  const [affectedProducts, setAffectedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isOpen || !material) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAffectedProducts([]);
      setConfirmed(false);
      return;
    }

    setLoading(true);
    // Fetch public products endpoint to check for in-use materials
    fetch(
      `${import.meta.env.VITE_API_URL || "http://localhost:3001"}/api/products`,
    )
      .then((res) => res.json())
      .then((result) => {
        const affected = result.data.filter((product: Product) =>
          product.components.some(
            (c: Component) => c.material === material._id,
          ),
        );
        setAffectedProducts(affected);
      })
      .catch((err) => console.error("Failed to check affected products:", err))
      .finally(() => setLoading(false));
  }, [isOpen, material]);

  if (!material) return null;

  const body = (
    <Box>
      {loading ? (
        <Typography>Verificando uso do material...</Typography>
      ) : affectedProducts.length > 0 ? (
        <>
          <Typography color="error" sx={{ fontWeight: 600 }}>
            Este material é utilizado pelos seguintes produtos:
          </Typography>
          <List dense sx={{ listStyleType: "disc", pl: 4 }}>
            {affectedProducts.map((product) => (
              <ListItem
                key={product._id}
                sx={{ display: "list-item", py: 0 }}
                disableGutters
              >
                <ListItemText primary={product.name} />
              </ListItem>
            ))}
          </List>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Deseja confirmar a exclusão mesmo assim?
          </Typography>
          {!confirmed && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
              }
              label="Sim, tenho certeza de que desejo deletar este material"
            />
          )}
        </>
      ) : (
        <Typography>Tem certeza que deseja deletar este material?</Typography>
      )}
    </Box>
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
