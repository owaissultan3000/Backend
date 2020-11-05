const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');
const Category = require('../models/category');

exports.createProduct = (req, res) => {

    //res.status(200).json( { file: req.files, body: req.body } );

    const {
        name, price, quantity, description, featured, category
    } = req.body;
    let productPicture = [];

    if(req.files.length > 0){
        productPicture = req.files.map(file => {
            return { img: file.filename }
        });
    }
console.log(price);
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPicture,
        featured,
        category,
        
    });

    product.save(((error, product) => {
        if(error) return res.status(400).json({ error });
        if(product){
            res.status(201).json({ product });
        }
    }));


};
