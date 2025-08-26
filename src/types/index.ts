export const shops = ["Migros", "Teknosa", "Bim"] as const;
export const categories = [
  "Elektronik",
  "Şarküteri",
  "Oyuncak",
  "Fırın",
] as const;

//Bir productın içine alacağı özellikleri sıralıyoruz.
export interface Product {
  id: string;
  name: string;
  shop: (typeof shops)[number]; //burda bu şekilde yazmamızdaki sebep sadece shopların arrayindeki tipler olabilir. Shop un değeri bu shops arrayindeki herhangi bir index numarası olabilir. Başka şansı yok.
  categories: (typeof categories)[number];
  isBought?: boolean;
}

export interface AddProductFormProps {
  onAdd: (product: Product) => void;
}

export interface ProductTableProps {
  products: Product[];
  onToggleBought: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface ProductFilterProps {
  filteredName: string;
  filteredShop: string;
  filteredCategory: string;
  filterStatus: FilterStatusProps;
  setFilterStatus: (value: FilterStatusProps) => void;
  setFilteredName: (value: string) => void;
  setFilteredShop: (value: string) => void;
  setFilteredCategory: (value: string) => void;
}

export type FilterStatusProps = "All" | "Bought" | "Not Bought";

export interface IconButtonProps {
  ariaLabel: string;
  onClick: () => void;
}
