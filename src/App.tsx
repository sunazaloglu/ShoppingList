import { useMemo, useState, type CSSProperties } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddProductForm from "./components/AddProductForm";
import type { FilterStatusProps, Product } from "./types";
import ProductTable from "./components/ProductTable";
import ProductFilter from "./components/ProductFilter";
import Confetti from "react-confetti";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredName, setFilteredName] = useState("");
  const [filteredShop, setFilteredShop] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatusProps>("All");
  const [showConfetti, setShowConfetti] = useState(false);
  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
    console.log(products);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(filteredName.toLowerCase());

    const shopMatch = !filteredShop || product.shop === filteredShop;
    const categoryMatch =
      !filteredCategory || product.categories === filteredCategory;

    const statusMatch =
      filterStatus === "All" ||
      (filterStatus === "Bought" && product.isBought) ||
      (filterStatus === "Not Bought" && !product.isBought);

    return nameMatch && shopMatch && categoryMatch && statusMatch;
  });

  const totalCount = products.length;
  const boughtCount = useMemo(
    () => products.filter((p) => p.isBought).length,
    [products]
  );
  const boughtPercent =
    totalCount === 0 ? 0 : Math.round((boughtCount / totalCount) * 100);
  const progressHex = "#bf86f5";
  type ProgressStyle = CSSProperties & {
    [key: string]: string | number | undefined;
  } & { "--bs-progress-bar-bg"?: string };
  const progressStyle: ProgressStyle = {
    height: 8,
    "--bs-progress-bar-bg": progressHex,
  };

  const handleToggleBought = (id: string) => {
    setProducts((prevProducts) => {
      const next = prevProducts.map((product) =>
        product.id === id
          ? { ...product, isBought: !product.isBought }
          : product
      );

      const hadAny = prevProducts.length > 0;
      const allWereBoughtBefore =
        hadAny && prevProducts.every((p) => p.isBought);
      const allAreBoughtNow = hadAny && next.every((p) => p.isBought);

      if (!allWereBoughtBefore && allAreBoughtNow) {
        setShowConfetti(true);
        alert("Complate Shopping!");
        setTimeout(() => setShowConfetti(false), 5000); // 5 saniye sonra confetti'yi kapat
      }

      return next;
    });
  };
  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };
  return (
    <>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
          colors={[
            "#e91e63",
            "#9c27b0",
            "#673ab7",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
          ]}
        />
      )}
      <Navbar bg="dark" data-bs-theme="dark" className="mb-4">
        <Container>
          <Navbar.Brand>Shopping List</Navbar.Brand>
          <div className="ms-auto d-flex align-items-center">
            <div
              className="bg-light text-dark rounded-pill px-3 py-1 d-flex align-items-center shadow-sm"
              style={{ gap: 12 }}
            >
              <span style={{ fontWeight: 600 }}>Bought</span>
              <div style={{ width: 120 }}>
                <ProgressBar now={boughtPercent} style={progressStyle} />
              </div>
              <Badge style={{ backgroundColor: progressHex, color: "#fff" }}>
                {boughtCount}
              </Badge>
              <span style={{ color: "#6c757d" }}>/</span>
              <Badge bg="secondary">{totalCount}</Badge>
            </div>
          </div>
        </Container>
      </Navbar>
      <div className="container">
        <Row className="g-4 mb-4">
          <Col md={6}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Add Product</h5>
                <AddProductForm onAdd={handleAddProduct} />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Filters</h5>
                <ProductFilter
                  filteredName={filteredName}
                  filteredCategory={filteredCategory}
                  filteredShop={filteredShop}
                  filterStatus={filterStatus}
                  setFilterStatus={setFilterStatus}
                  setFilteredName={setFilteredName}
                  setFilteredCategory={setFilteredCategory}
                  setFilteredShop={setFilteredShop}
                />
              </div>
            </div>
          </Col>
        </Row>
        <ProductTable
          products={filteredProducts}
          onToggleBought={handleToggleBought}
          onDelete={handleDeleteProduct}
        />
      </div>
    </>
  );
}

export default App;
