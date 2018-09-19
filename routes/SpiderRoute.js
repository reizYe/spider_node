var express = require('express');
var spiderRouter = express.Router();
var SpiderController = require('../controllers/SpiderController');

spiderRouter.get('/', SpiderController.SpiderList);
spiderRouter.get('/getdetail/:id', SpiderController.getdetail);
spiderRouter.post('/update',SpiderController.UpdateSpider)
spiderRouter.get('/delete/:id',SpiderController.DeleteSpider)
spiderRouter.post('/add', SpiderController.AddSpider);

module.exports = spiderRouter;