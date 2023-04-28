import { promises as fs } from "fs";

const RUTA_ARCHIVO = "./productos.txt";

export class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  static incrementarID() {
    if (this.idIncrement) {
      this.idIncrement++;
    } else {
      this.idIncrement = 1;
    }
    return this.idIncrement;
  }

  async loadProducts() {
    try {
      if (!fs.existsSync(RUTA_ARCHIVO)) {
        await fs.writeFile(RUTA_ARCHIVO, "[]");
      }
      const data = await fs.readFile(RUTA_ARCHIVO, "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(producto) {
    try {
      const prodsJSON = await fs.readFile(this.path, "utf-8");
      const prods = JSON.parse(prodsJSON);
      producto.id = ProductManager.incrementarID();
      prods.push(producto);
      await fs.writeFile(this.path, JSON.stringify(prods));
      return "Producto creado";
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      const prods = await fs.readFile(this.path, "utf-8");
      return JSON.parse(prods);
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      const prodsJSON = await fs.readFile(this.path, "utf-8");
      const prods = JSON.parse(prodsJSON);
      if (prods.some((prod) => prod.id === parseInt(id))) {
        return prods.find((prod) => prod.id === parseInt(id));
      } else {
        return "Producto no encontrado";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(
    id,
    { title, description, price, thumbnail, status, code, stock }
  ) {
    try {
      const products = await fs.readFile(this.path, "utf-8");
      const prods = JSON.parse(products);
      if (prods.some((prod) => prod.id === parseInt(id))) {
        let index = prods.findIndex((prod) => prod.id === parseInt(id));
        prods[index].title = title;
        prods[index].description = description;
        prods[index].price = price;
        prods[index].thumbnail = thumbnail;
        prods[index].status = status;
        prods[index].code = code;
        prods[index].stock = stock;
        await fs.writeFile(this.path, JSON.stringify(prods));
        return "Producto actualizado";
      } else {
        return "Producto no encontrado";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await fs.readFile(this.path, "utf-8");
      const prods = JSON.parse(products);
      if (prods.some((prod) => prod.id === parseInt(id))) {
        const prodsFiltrados = prods.filter((prod) => prod.id !== parseInt(id));
        await fs.writeFile(this.path, JSON.stringify(prodsFiltrados));
        return "Producto eliminado";
      } else {
        return "Producto no encontrado";
      }
    } catch (error) {
      console.log(error);
    }
  }
}

class Product {
  constructor(
    title = "",
    description = "",
    price = 0,
    thumbnail = "",
    code = "",
    status = true,
    stock = 0
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.status = status;
    this.code = code;
    this.stock = stock;

    if (
      title === "" ||
      description === "" ||
      price === 0 ||
      code === "" ||
      stock === 0
    ) {
      throw new Error("Todos los campos son obligatorios");
    }
  }
}
