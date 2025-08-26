import { FormCheck, FormControl, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { shops, categories, type ProductFilterProps } from "../types";

function ProductFilter({
  filteredName,
  setFilteredName,
  filteredShop,
  filterStatus,
  setFilterStatus,
  setFilteredShop,
  filteredCategory,
  setFilteredCategory,
}: ProductFilterProps) {
  const boughtArray = ["All", "Bought", "Not Bought"];
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Filter By Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a product name..."
          value={filteredName}
          onChange={(e) => setFilteredName(e.target.value)}
        />
        <Form.Label>Filter By Shop</Form.Label>
        <FormControl
          as="select"
          value={filteredShop}
          onChange={(e) => setFilteredShop(e.target.value)}
        >
          <option value="">All Shops</option>
          {shops.map((shop, index) => (
            <option key={index} value={shop}>
              {shop}
            </option>
          ))}
        </FormControl>

        <Form.Label>Filter By Categories</Form.Label>
        <FormControl
          as="select"
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </FormControl>
      </Form.Group>
      <FormGroup>
        {boughtArray.map((status) => (
          <FormCheck
            type="radio"
            key={status}
            label={
              status === "All"
                ? "All"
                : status === "Bought"
                ? "Bought"
                : "Not Bought"
            }
            name="statusFilter"
            value={status}
            onChange={() => setFilterStatus(status as typeof filterStatus)}
            checked={filterStatus === status}
          />
        ))}
      </FormGroup>
    </>
  );
}

export default ProductFilter;
