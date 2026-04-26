// Auth
export interface AuthState {
  token: string | null;
  userId: string | null;
}

// Material — re-export from dedicated material types
export type {
  Material,
  MaterialCategory,
  MaterialUnit,
  MaterialFormData,
} from './material';
export {
  MaterialFormSchema,
  MaterialCategoryEnum,
  MaterialUnitEnum,
  MATERIAL_CATEGORIES,
  MATERIAL_UNITS,
} from './material';

// Product
export interface Component {
  material: string;
  quantityType: 'fixed' | 'area_based' | 'perimeter_based';
  quantityFactor: number;
}

export interface ProductConstraints {
  minHeight: number;
  maxHeight: number;
  minWidth: number;
  maxWidth: number;
  minDepth: number;
  maxDepth: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  photos: string[];
  isFeatured: boolean;
  constraints: ProductConstraints;
  components: Component[];
  baseLaborCost: number;
  profitMargin: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductStep1Data {
  name: string;
  description: string;
  isFeatured: boolean;
  constraints: ProductConstraints;
  baseLaborCost: number | '';
  profitMargin: number | '';
  photos: File[];
}

export interface ComponentFormRow {
  id: string;
  materialId: string;
  quantityType: 'fixed' | 'area_based' | 'perimeter_based' | '';
  quantityFactor: number | '';
}

export interface ProductStep2Data {
  components: ComponentFormRow[];
}

// Quote
export interface TechSheetItem {
  materialName: string;
  quantityConsumed: string;
  unit: string;
  cost: string;
}

export interface Quote {
  finalPrice: number;
  details: {
    totalMaterialCost: number;
    laborCost: number;
    profit: number;
    technicalSheet: TechSheetItem[];
  };
}

export interface QuoteRequest {
  height: number;
  width: number;
  depth: number;
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// API Error
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
