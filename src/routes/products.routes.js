// author: Fathma siddique
// lastmodified: 8/7/2019
// description: the file has all the product  routes

const express = require('express')
const router = express.Router()
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');


const product_controller = require('../controllers/product.controller')
const { ensureAuthenticated } = require("../helpers/auth");
mongoose.Promise = global.Promise;

const keys = require('../../config/keys')


var filename;

// create storage engine
const storage = new GridFsStorage(
  {
    url: keys.database.mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) return reject(err);
          
          filename = buf.toString('hex') + path.extname(file.originalname)
          const fileInfo = {
            filename: filename,
            bucketName: 'fs'
          };
          resolve(fileInfo)
        });
      });
    }
  });

const upload = multer({ storage })


// 23/4/2019 new
// router.get('/test',  product_controller.report)
router.get('/InhouseInventory',  product_controller.getInhouseInventoryPage)
router.get('/DealerInventory',  product_controller.getDealerInventoryPage)
router.post('/regiSave',  product_controller.SaveProductLP)
router.post('/regiSaveDealer',  product_controller.SaveProductDealer)
router.post('/showfields',  product_controller.showProductRegistrationFields)
router.post('/upload/update',  upload.array('imagePath3'), product_controller.SaveImage3)

router.post('/img/detete',  product_controller.deteteImg)
router.post('/checkSerials',  product_controller.checkSerials)

router.get('/Update/:_id',  product_controller.getProductUpdatePage)
router.post('/updateProduct',  product_controller.updateProduct)
router.get('/active/:id',  product_controller.makeActive)
router.get('/unactive/:id',  product_controller.makeNotActive)
router.get('/Available/:id',  product_controller.makeAvailable)
router.get('/notAvailable/:id',  product_controller.makeNotAvailable)
router.get('/serials',  product_controller.getSerials)

router.get('/viewLowQuantityProducts',  product_controller.viewLowQuantityProducts)
router.get('/viewProducts', product_controller.viewProducts)

router.post('/price/save', product_controller.SavePrice)

// product attribute/ specifications
router.post('/attribute/save', product_controller.SaveAttribute)
router.get('/attributes/delete1/:_id/:label', product_controller.deleteAttribute)

router.get('/Specifications', product_controller.Specifications)
router.get('/specifications/new', product_controller.SpecificationsNew)
router.get('/specifications/new/:id', product_controller.SpecificationsNewId)
router.post('/specifications/save', product_controller.SpecificationsSave)

router.get('/specifications/makeDisabled/:sid', product_controller.makeDisabled)
router.get('/specifications/makeEnabled/:sid', product_controller.makeEnabled)
router.get('/specifications/makeFalse/:sid', product_controller.specificationMakeFalse)
router.get('/specifications/makeTrue/:sid', product_controller.specificationMakeTrue)

router.post('/shipping/save', product_controller.shippingSave)

router.post('/HomePageTag/save', product_controller.SaveHomePageTag)

// related products
router.post('/relatedProducts1', product_controller.relatedProducts1)
router.get('/relatedProducts/delete1/:pid/:rid', product_controller.relatedProductsDelete1)


// previous 
// Edit (Inventory With Serial number)

router.get( "/Edit/:id", product_controller.getEditpage )
// router.post( "/EditReplace/:lot_id/:pid", product_controller.EditReplace )
// router.post( "/EditDelete/:lot_id/:pid", product_controller.EditDelete )
// router.post( "/EditPP/:lot_id/:pid", product_controller.EditPP )
// router.get("/newLot", product_controller.newLot)

// Edit (Inventory Without Serial number)

// router.post("/stockEditNoSerial/:lot/:pid", product_controller.stockEditNoSerial)



// router.get("/viewLowLive", product_controller.lowLiveQuantityDetails)

// router.get("/getProductBySubcat_filter/:sub_cat", product_controller.getProductBySub_filter)
// router.get("/getProductBySubcat/:sub_cat", product_controller.getProductBySubcat)
// router.post("/getProductBySubcat/:sub_cat", product_controller.getProductBySubcat)
// router.get("/getProductByCat/:cat", product_controller.getProductByCat)
// router.post("/getProductByCat/:cat", product_controller.getProductByCat)
// router.get("/StockLowToHigh", product_controller.StockLowToHigh)
// router.get("/StockHighToLow", product_controller.StockHighToLow)
// router.get("/getProductByCat_filter/:cat", product_controller.getProductByCat_filter)
// router.get("/viewStock/:id", product_controller.viewStock)
// router.get("/stockInfo/:id", product_controller.stockInfo)

// validation
router.get("/check_availablity/:model", product_controller.check_availablity)


// live
// router.get("/liveStockEdit/:id/:pid", product_controller.getLiveStockEditpage)
// router.get("/liveStockEditNoSerial/:id/:pid", product_controller.getLiveStockEditNoSerialpage)
// router.get("/RestoreLivepage/:id", product_controller.getRestoreLivepage)
// router.get("/RestoreLiveNoserialPage/:id", product_controller.RestoreLiveNoserialPage)
// router.post("/Restore/:id", product_controller.getRestoreLive)


// router.post("/search", product_controller.getSearchResult)


module.exports = router
