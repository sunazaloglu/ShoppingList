import { useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  shops,
  categories,
  type AddProductFormProps,
  type Product,
} from "../types";
import { nanoid } from "nanoid";

function AddProductForm({ onAdd }: AddProductFormProps) {
  const [name, setName] = useState("");
  const [shop, setShop] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (!name || !category || !shop) {
      alert("Please fill in all fields.");
      return;
    }
    onAdd({
      id: nanoid(),
      name,
      shop: shop as Product["shop"],
      categories: category as Product["categories"],
      isBought: false,
    });
    setName("");
    setShop("");
    setCategory("");
  };
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter a product name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Shops</Form.Label>
        <FormControl
          as="select"
          value={shop}
          onChange={(e) => setShop(e.target.value)}
        >
          <option value="">All Shops</option>
          {shops.map((shop, index) => (
            <option key={index} value={shop}>
              {shop}
            </option>
          ))}
        </FormControl>

        <Form.Label>Categories</Form.Label>
        <FormControl
          as="select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </FormControl>
      </Form.Group>
      <Button variant="info" onClick={handleAdd}>Add Product</Button>
    </>
  );
}

export default AddProductForm;
