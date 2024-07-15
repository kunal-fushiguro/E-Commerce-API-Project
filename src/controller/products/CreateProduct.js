import Joi from "joi";
import Products from "../../models/Product.js";
import CustomErrorHandle from "../../services/CustomErrorHandle.js";

const product = {
  async create(req, res, next) {
    const productSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      category: Joi.string().required(),
      stock: Joi.number().required(),
    });
    const { err } = productSchema.validate(req.body);

    if (err) {
      return next(err);
    }

    try {
      await Products.create(req.body);
      res.status(201).json({
        success: true,
        message: "Product Created SuccessFully",
      });
    } catch (error) {
      return next(CustomErrorHandle.serverError(error.message));
    }
  },
  async allShow(req, res, next) {
    try {
      const allProducts = await Products.find({});
      res.status(200).json({
        success: true,
        allProducts,
      });
    } catch (error) {
      return next(CustomErrorHandle.serverError(error.message));
    }
  },
  async delete(req, res, next) {
    const deleteSchema = Joi.object({
      productid: Joi.string().required(),
    });

    const { err } = deleteSchema.validate(req.body);

    if (err) {
      return next(err);
    }

    try {
      const deleteProduct = await Products.findByIdAndDelete(
        req.body.productid
      );
      if (!deleteProduct) {
        return next(CustomErrorHandle.notFound("Product Not Found"));
      }

      res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      return next(CustomErrorHandle.serverError(error.message));
    }
  },
};

export default product;
