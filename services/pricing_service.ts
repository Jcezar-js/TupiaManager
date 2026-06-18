import Product from '../models/product_schema';
import { app_error_class } from '../middlewares/error_handling_middleware';

interface Dimensions {
  height: number;
  width: number;
  depth: number;
}

export const calculateProductPrice = async (productId: string, dimensions: Dimensions) => {
  const product = await Product.findById(productId).populate('components.material');
  if (!product) {
    throw new app_error_class('Produto não encontrado', 404);
  }

  const { minHeight, maxHeight, minWidth, maxWidth, minDepth, maxDepth } = product.constraints;

  if (dimensions.height < minHeight || dimensions.height > maxHeight) {
    throw new app_error_class(`Altura inválida. Mínimo: ${minHeight}, Máximo: ${maxHeight}`, 400);
  }
  if (dimensions.width < minWidth || dimensions.width > maxWidth) {
    throw new app_error_class(`Largura inválida. Mínimo: ${minWidth}, Máximo: ${maxWidth}`, 400);
  }
  if (dimensions.depth < minDepth || dimensions.depth > maxDepth) {
    throw new app_error_class(`Profundidade inválida. Mínimo: ${minDepth}, Máximo: ${maxDepth}`, 400);
  }

  let totalMaterialCost = 0;
  const area = (dimensions.height * dimensions.width) / 1_000_000; // m²
  const perimeter = (2 * (dimensions.height + dimensions.width)) / 1_000; // metros

  const technicalSheet = [];

  for (const component of product.components) {
    const material: any = component.material;
    let quantityConsumed = 0;

    switch (component.quantityType) {
      case 'fixed':
        quantityConsumed = component.quantityFactor;
        break;
      case 'area_based':
        quantityConsumed = area * component.quantityFactor;
        break;
      case 'perimeter_based':
        quantityConsumed = perimeter * component.quantityFactor;
        break;
    }

    const finalQuantity = quantityConsumed * material.wasteFactor;
    const materialCost = finalQuantity * material.pricePerUnit;

    totalMaterialCost += materialCost;

    technicalSheet.push({
      materialName: material.name,
      quantityConsumed: finalQuantity.toFixed(2),
      unit: material.unit,
      cost: materialCost.toFixed(2),
    });
  }

  const totalBaseCost = totalMaterialCost + product.baseLaborCost;
  const finalPrice = totalBaseCost * (1 + product.profitMargin / 100);

  return {
    finalPrice: Math.ceil(finalPrice),
    details: {
      totalMaterialCost,
      laborCost: product.baseLaborCost,
      profit: finalPrice - totalBaseCost,
      technicalSheet,
    },
  };
};
