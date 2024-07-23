module.exports = (temp, product) => {
  let output = temp;
  output = output.replace(/{%PRODUCT_NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT_IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT_ID%}/g, product.id);
  output = output.replace(/{%PRODUCT_FROM%}/g, product.from);
  output = output.replace(/{%PRODUCT_QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT_NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT_PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  if (!product.organic) {
    output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, 'not-organic');
  } else {
    output = output.replace(/{%PRODUCT_NOT_ORGANIC%}/g, '');
  }

  return output;
};
