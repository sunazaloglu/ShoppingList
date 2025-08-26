import Table from "react-bootstrap/Table";
import styled from "styled-components";
import type { ProductTableProps } from "../types";
import { Button } from "react-bootstrap";
import IconButton from "./IconButton";

const StyledTableCell = styled.td<{ isBought?: boolean }>`
  text-decoration: ${({ isBought }) => (isBought ? "line-through" : "none")};
`;
function ProductTable({
  products,
  onToggleBought,
  onDelete,
}: ProductTableProps) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Shop</th>
          <th>Category</th>
          <th>Actions</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 ? (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", color: "#6c757d" }}>
              No products yet. Add one from the form.
            </td>
          </tr>
        ) : (
          products.map((product) => (
          <tr key={product.id}>
            <StyledTableCell isBought={product.isBought}>
              {product.id}
            </StyledTableCell>
            <StyledTableCell isBought={product.isBought}>
              {product.name}
            </StyledTableCell>
            <StyledTableCell isBought={product.isBought}>
              {product.shop}
            </StyledTableCell>
            <StyledTableCell isBought={product.isBought}>
              {product.categories}
            </StyledTableCell>
            <td>
              <Button
                variant="secondary"
                onClick={() => onToggleBought(product.id)}
              >
                {product.isBought ? "purchased" : "Not will be purchased"}
              </Button>
            </td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              <IconButton
                ariaLabel="Delete product"
                onClick={() => onDelete(product.id)}
              />
            </td>
          </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}

export default ProductTable;
