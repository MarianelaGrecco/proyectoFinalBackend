import { Router } from "express";
import { ProductManager } from "../ProductManager.js";

const productManager = new ProductManager("./productos.txt");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  const limit = req.query.limit;
  let result = products;

  if (limit) {
    const limitNumber = parseInt(limit);
    result = products.slice(0, limitNumber);
  }
  if (result.length > 0) {
    res.send(JSON.stringify(result));
  } else {
    res.status(404).send("No products found");
  }
});

productRouter.get("/:pid", async (req, res) => {
  const products = await productManager.getProductById(req.params.pid);
  res.json(products);
});

productRouter.post("/", async (req, res) => {
  const { title, description, price, thumbnail, status, code, stock } =
    req.body;
  await productManager.addProduct({
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock,
  });
  res.send("Producto creado");
});

productRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const { title, description, price, thumbnail, status, code, stock } =
    req.body;

  const mensaje = await productManager.updateProduct(id, {
    title,
    description,
    price,
    thumbnail,
    status,
    code,
    stock,
  });

  res.send(mensaje);
});

productRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const mensaje = await productManager.deleteProduct(id);
  res.send(mensaje);
});

export default productRouter;
