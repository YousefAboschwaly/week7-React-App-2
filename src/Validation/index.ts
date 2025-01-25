/**
import { colors } from './../data/index';
 * Validates the properties of a product object based on predefined criteria.
 *
 * @param {IProps} product - The product object to validate, containing `title`, `description`, `imageURL`, `price`, and `colors`.
 * @returns {IError} - An object with error messages for each invalid field. If a field is valid, its error message will be an empty string.
 *
 * @interface IProps
 * @property {string} title - The product title, required to be between 10 and 80 characters.
 * @property {string} description - The product description, required to be between 10 and 900 characters.
 * @property {string} imageURL - The product image URL, required to be a valid URL.
 * @property {string} price - The product price, required to be a valid number.
 * @property {string[]} colors - The product colors, required to be a non-empty array.
 */
interface IProps {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors:string[]
}
interface IErrors {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors:string
}



export function productValidation(product: IProps) {
  const errors: IErrors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: ""
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  // Validate title
  if (!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }

  // Validate description
  if (!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
    errors.description = "Product description must be between 10 and 900 characters!";
  }

  // Validate imageURL
  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid image URL is required!";
  }

  // Validate price
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Valid price is required!";
  }

  // Validate colors
  if (product.colors.length ==0) {
    errors.colors = "At least one valid color is required!";
  }

  return errors;
}
