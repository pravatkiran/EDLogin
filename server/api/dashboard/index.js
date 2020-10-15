var express = require('express');
var controller = require('./dashboard.controller');
import * as auth from '../../auth/auth.service';
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

router.post('/getHeadQuarterList', controller.getHeadQuarterList);
// router.post('/Get_Customer_Sales_Analysis/', auth.isAuthenticated(), controller.Get_Customer_Sales_Analysis);
// router.post('/Get_User_Customer_Sales_Rights_BYID/', auth.isAuthenticated(), controller.Get_User_Customer_Sales_Rights_BYID);
// router.post('/Save_User_Customer_Sales_Rights/', auth.isAuthenticated(), controller.Save_User_Customer_Sales_Rights);

router.post('/getCriteriaLists', controller.getCriteriaLists);
router.post('/getBrands', controller.getBrands);
router.post('/getDivisions', controller.getDivisions);
router.post('/getStockistLists', controller.getStockistLists);
router.post('/getCustomerLists', controller.getCustomerLists);
router.post('/getDoctorLists', controller.getDoctorLists);
router.post('/getCriteriaById', controller.getCriteriaById);
router.post('/saveBiDashboard', controller.saveBiDashboard);


router.post('/getHospitalTotalSales', controller.getHospitalTotalSales);
router.post('/getDoctorTotalSales', controller.getDoctorTotalSales);
router.post('/getHospitalTotalOrders', controller.getHospitalTotalOrders);
router.post('/getTotalSales', controller.getTotalSales);
router.post('/getTotalOrders', controller.getTotalOrders);
router.post('/getStateWiseData', controller.getStateWiseData);
router.post('/getDoctorData', controller.getDoctorData);
router.post('/getBrandWiseSalesData', controller.getBrandWiseSalesData);
router.post('/getDivisionWiseSalesData', controller.getDivisionWiseSalesData);
router.put('/updateStatus/:id', controller.updateStatus);
router.post('/getHqTopSales', controller.getHqTopSales);
router.post('/getStates', controller.getStates);
router.post('/getDistributor', controller.getDistributor);
router.post('/getEntDistributors', controller.getEntDistributors);
router.post('/getEntCompanies', controller.getEntCompanies);
router.post('/getEntTotalSales', controller.getEntTotalSales);
router.post('/getEntTotalPurchase', controller.getEntTotalPurchase);
router.post('/getEntDistributorSales', controller.getEntDistributorSales);
router.post('/getFilterEntDistributorSales', controller.getFilterEntDistributorSales);
router.post('/getEntTopCompanySales', controller.getEntTopCompanySales);
// router.post('/getFilterEntTopCompanySales', controller.getFilterEntTopCompanySales);
router.post('/getEntStateSales', controller.getEntStateSales);
router.post('/getEntTotalSaleInvoices', controller.getEntTotalSaleInvoices);
router.post('/getEntTotalPurchaseInvoices', controller.getEntTotalPurchaseInvoices);
router.post('/getEntTopProductSales', controller.getEntTopProductSales);
router.post('/getEntWeeklySales', controller.getEntWeeklySales);
router.post('/getEntTopProductQty', controller.getEntTopProductQty);
router.post('/getEntDistSalesPurchase', controller.getEntDistSalesPurchase);
router.post('/getEntInvoiceReport', controller.getEntInvoiceReport);
router.post('/getEntProductTrendSales', controller.getEntProductTrendSales);
router.post('/getEntProductTrendQty', controller.getEntProductTrendQty);
router.post('/getEntDistributorTrendSales', controller.getEntDistributorTrendSales);
router.post('/getProductList', controller.getProductLists);

module.exports = router;
