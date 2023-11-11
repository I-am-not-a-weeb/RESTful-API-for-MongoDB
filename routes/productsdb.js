const express = require('express');
const router = express.Router();
const Product = require('../models/product');

//3 get
router.get('/products', async (req,res)=>
{
    try
    {
        const products = await Product.find(req.body.query,req.body.projection).sort(req.body.sort)
        res.json(products);
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
})

//4 post
router.post('/products', checkDistinct, async(req,res)=>
{
    if(res.isDistinct)
    {
        const product = new Product(
            {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                unit: req.body.unit
            }
        )
        try
        {
            const newProduct = await product.save();
            res.status(201).json(newProduct);
        }
        catch(err)
        {
            res.status(400).json({message:err.message});
        }
    }
    else
    {
        res.status(409).json({message:'Product with given name already exists'})
    }
})

//5 put
router.put('/products/:id',async(req,res)=>
{
    const product = await Product.findById(req.params.id);
})

//6 delete

router.delete('/products/:id', async (req,res)=>
{
    try
    {
        await res.product.remove();
    }
    catch(err)
    {
        res.status(500).json({message:err.message})
    }
})

async function checkDistinct(req,res,next)
{
    let isDistinct;
    try
    {
        if(await Product.findOne({name:req.body.name})!=null)
        {
            isDistinct = false;
        }
        else
        {
            isDistinct = true;
        }
        res.isDistinct = isDistinct;
        next();
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
}

async function getProduct(req,res,next)
{
    let product;
    try
    {
        product = await Product.findById(req.params.id);
        if(product == null)
        {
            return res.status(404).json({message:'Cannot find product'});
        }
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
    res.product = product;
    next();
}

(req,res,next)=>
{
    Product.find().sort()
}

module.exports = router;