import { Router } from "express";
import { CartManager } from "../CartManager.js";

const cartManager = new CartManager("./cart.txt");

const cartRouter = Router();

cartRouter.get("/:cid", async (req, res) => {
  const cart = await cartManager.getCartById(req.params.cid);
  res.json(cart);
});

cartRouter.post("/", async (req, res) => {
  const newCart = await cartManager.createCarrito();
  res.send(newCart);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const quantity = req.body.quantity || 1;
  const addedProduct = await cartManager.addProductCart(cid, pid, quantity);
  res.send(addedProduct);
});

export default cartRouter;
