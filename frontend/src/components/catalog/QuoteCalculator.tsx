import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { productService } from "../../services/product.service";
import { isApiError } from "../../services/api";
import type { Product, Quote, QuoteRequest } from "../../types/index";

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

export function QuoteCalculator({ product }: { product: Product }) {
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setQuote(null);

    if (!height || !width || !depth) {
      setError("Preencha todas as dimensões");
      return;
    }

    setLoading(true);
    try {
      const dimensions: QuoteRequest = {
        height: Number(height),
        width: Number(width),
        depth: Number(depth),
      };
      const result = await productService.getProductQuote(
        product._id,
        dimensions,
      );
      setQuote(result);
    } catch (err) {
      setError(
        isApiError(err)
          ? err.message || "Erro ao calcular orçamento"
          : "Erro ao calcular orçamento",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 672, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Calcular Orçamento
      </Typography>

      <Paper component="form" onSubmit={handleSubmit} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Altura (mm)"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ex: 1800"
              helperText={`Mín: ${product.constraints.minHeight}mm | Máx: ${product.constraints.maxHeight}mm`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Largura (mm)"
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Ex: 900"
              helperText={`Mín: ${product.constraints.minWidth}mm | Máx: ${product.constraints.maxWidth}mm`}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Profundidade (mm)"
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              placeholder="Ex: 500"
              helperText={`Mín: ${product.constraints.minDepth}mm | Máx: ${product.constraints.maxDepth}mm`}
            />
          </Grid>
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Button type="submit" variant="contained" fullWidth disabled={loading}>
          {loading ? "Calculando..." : "Calcular Orçamento"}
        </Button>
      </Paper>

      {quote && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ mb: 3, p: 2, bgcolor: "success.light", borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Preço Final
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: "success.dark" }}
            >
              R$ {formatBRL(quote.finalPrice)}
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mb: 2 }}>
            Ficha Técnica
          </Typography>
          <TableContainer sx={{ mb: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell align="right">Quantidade</TableCell>
                  <TableCell>Unidade</TableCell>
                  <TableCell align="right">Custo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quote.details.technicalSheet.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.materialName}</TableCell>
                    <TableCell align="right">{item.quantityConsumed}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell align="right">
                      R$ {formatBRL(parseFloat(item.cost))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Divider sx={{ mb: 2 }} />
          <Stack spacing={1}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">
                Total de Materiais:
              </Typography>
              <Typography sx={{ fontWeight: 600 }}>
                R$ {formatBRL(quote.details.totalMaterialCost)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">Mão de Obra:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                R$ {formatBRL(quote.details.laborCost)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography color="text.secondary">Lucro:</Typography>
              <Typography sx={{ fontWeight: 600 }}>
                R$ {formatBRL(quote.details.profit)}
              </Typography>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
