module.exports = (temp, product) => {
    let output = temp.replace(/{%productId%}/g, product.id);
    output = output.replace(/{%productName%}/g, product.productName);
    output = output.replace(/{%productImage%}/g, product.image);
    output = output.replace(/{%productOrigin%}/g, product.from);
    output = output.replace(/{%productNutrients%}/g, product.nutrients);
    output = output.replace(/{%productQuantity%}/g, product.quantity);
    output = output.replace(/{%productPrice%}/g, product.price);
    output = output.replace(/{%productDescription%}/g, product.description);

    if(!product.organic) {output = output.replace(/{%not_organic%}/g, 'not-organic');}
    return output;
}