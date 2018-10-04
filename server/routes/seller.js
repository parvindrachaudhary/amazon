const router = require('express').Router();
const Product =require('../models/product');


const aws =require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({ accessKeyId: "AKIAJZ5YUVKTMPGSL7JQ", secretAccessKey:"UwZ/DUb1PNMRnrys8895ng1210eo+UpM13CiG9Jy"});
   

const faker = require('faker');

const checkJWT = require('../middlewares/check-jwt');

const upload = multer({
	storage: multerS3({
		s3:s3,
		bucket:'amazonowebapplication',
		metadata: function(req, file, cb){
			cb(null, { fieldName: file.fieldName});

		},
		key: function(req, file, cb){
			cb(null, Date.now().toString());

		}

	})
});

router.route('products')
.get(checkJWT,(req, res, next ) => {
	Product.find({ owner : req.decoded.user._id })
		.populate('owner')
		.populate('category')
		.exec((err, products) => {
			if(products){
				res.json({
					success:true,
					message: 'products',
					products :products
				});
			}
		}); 
})
.post([checkJWT, upload.single('product_picture')],(req, res, next ) => {
	let product =new Product();
	product.owner = req.decoded.user._id;
	product.category = req.body.categoryId;
	product.title = req.body.title;
	product.price = req.body.price;
	product.description = req.body.description;
	product.image = req.file.location;
	product.save();
	res.json({
		success:true,
		message:'successfully added the product '
	});
});

/* for testing*/
router.get('/faker/test',(req, res, next ) => {
	for (var i = 0; i < 20; i++) {
		let product = new Product();
        
         product.category = '5b9ae8a3108fb81954674c50';
		 product.owner ='5b9adb2aca92fa14a0bedee2' ;
		 product.image = faker.image.cats();
		 product.title =faker.commerce.productName();
		 product.description = faker.lorem.words();
		 product.price = faker.commerce.price();
		 product.save();
	}

	res.json({
		message:'successfully added 20 products.'
	});
});

 module.exports = router;








