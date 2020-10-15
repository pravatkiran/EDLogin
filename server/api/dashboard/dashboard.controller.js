/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /y              ->  index
 * POST    /y              ->  create
 * GET     /y/:id          ->  show
 * PUT     /y/:id          ->  upsert
 * PATCH   /y/:id          ->  patch
 * DELETE  /y/:id          ->  destroy
 */

import { applyPatch } from 'fast-json-patch';
import { Adminanalyze } from '../../sqldb';
var db = require('../../sqldb'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

function trimQuotes(data) {
    return data.replace(/"/g, "'");
}

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function (entity) {
        try {
            applyPatch(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function (entity) {
        if (entity) {
            return entity.destroy()
                .then(() => res.status(204).end());
        }
    };
}

function handleEntityNotFound(res) {
    return function (entity) {
        if (!entity) {
            res.status(404).end();
            return null;
        }
        return entity;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Adminanalyzes
export function index(req, res) {
    return Adminanalyze.findAll()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single Adminanalyze from the DB
export function show(req, res) {
    return Adminanalyze.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new Adminanalyze in the DB
export function create(req, res) {
    return Adminanalyze.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Adminanalyze in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Adminanalyze.upsert(req.body, {
        where: {
            _id: req.params.id
        }
    })
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing Adminanalyze in the DB
export function patch(req, res) {
    if (req.body._id) {
        Reflect.deleteProperty(req.body, '_id');
    }
    return Adminanalyze.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a Adminanalyze from the DB
export function destroy(req, res) {
    return Adminanalyze.find({
        where: {
            _id: req.params.id
        }
    })
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}

export function getCriteriaLists(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL Get_Criteria( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getHeadQuarterList(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('headquarterlist', queryData);
    sequelize.query('CALL BI_GetDashboards(' + queryData + ')')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getBrands(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetDashboards( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}


export function getDivisions(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('divTotalSales', queryData);
    sequelize.query('CALL BI_GetDashboards( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}


export function getStockistLists(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetDashboards( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getCustomerLists(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetDashboards( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getDoctorLists(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetDashboards( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getCriteriaById(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL Bi_GetCriteriaById(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function saveBiDashboard(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL Save_BI_Data( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getHospitalTotalSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL GetBiInvoiceData(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getDoctorTotalSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL GetBiInvoiceData(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getHospitalTotalOrders(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL GetBiInvoiceData(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getTotalSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('total sales', queryData);
    sequelize.query('CALL GetBiInvoiceData(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getTotalOrders(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL GetBiInvoiceData(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getStateWiseData(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetStateWiseSales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getDoctorData(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('get top doctorsales', queryData);
    sequelize.query('CALL BI_GetTopDoctorSales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getBrandWiseSalesData(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetTopBrandSales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getDivisionWiseSalesData(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetDivisionWiseSales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function updateStatus(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL Bi_UpdateCriteria(' + queryData + ' , ' + req.params.id + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getHqTopSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetTopHQSales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

export function getStates(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('queryDAta', queryData);
    sequelize.query('CALL BI_GetDashboards( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Distributor
export function getDistributor(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_GetDashboards( ' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero distributors
export function getEntDistributors(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero companies
export function getEntCompanies(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Entero Total Sales
export function getEntTotalSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_Dashboard(' + queryData + ');');
    sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero Total Purchase
export function getEntTotalPurchase(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_Dashboard(' + queryData + ');');
    sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero Distributor Wise Sales
export function getEntDistributorSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_DistributorWiseSales(' + queryData + ');');
    sequelize.query('CALL BI_ENT_DistributorWiseSales(' + queryData + ');')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(handleError(res));
}

// Entero filter for distributor sales
export function getFilterEntDistributorSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('queryData', queryData);
    sequelize.query('CALL BI_ENT_DistributorWiseSales(' + queryData + ');')
        .then(response => {
            res.status(200).json({ status: 'ok', response });
        })
        .catch(handleError(res));
}

// Entero Top Company Sales
export function getEntTopCompanySales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_TopCompany(' + queryData + ');');
    sequelize.query('CALL BI_ENT_TopCompany(' + queryData + ');')
        .then(response => {
            res.status(200).json(response);
        })
        .catch(handleError(res));
}

// Entero filter for top company sales
// export function getFilterEntTopCompanySales(req, res) {
//     var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
//     sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ');')
//         .then(response => {
//             res.status(200).json({status: 'ok', response});
//         })
//         .catch(handleError(res));
// }

// Entero state sales
export function getEntStateSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_StateSales(' + queryData + ');');
    sequelize.query('CALL BI_ENT_StateSales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero total no of sale invoices
export function getEntTotalSaleInvoices(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_Dashboard(' + queryData + ');');
    sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}


// Entero total no of purchase invoices
export function getEntTotalPurchaseInvoices(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_Dashboard(' + queryData + ');');
    sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}
// Entero top product sales
export function getEntTopProductSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_TopProducts(' + queryData + ');');
    sequelize.query('CALL BI_ENT_TopProducts(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero weakly sales data
export function getEntWeeklySales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_WeeklySalesData(' + queryData + ');');
    sequelize.query('CALL BI_ENT_WeeklySalesData(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero Monthly top products by quantity
export function getEntTopProductQty(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_TOP_Product_Qty(' + queryData + ');');
    sequelize.query('CALL BI_ENT_TOP_Product_Qty(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero distributor wise sales purchase
export function getEntDistSalesPurchase(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('CALL BI_ENT_DistributorWisePurchaseSales(' + queryData + ');');
    sequelize.query('CALL BI_ENT_DistributorWisePurchaseSales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Entero Inventory Report
export function getEntInvoiceReport(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('inventory report', queryData);
    sequelize.query('CALL BI_ENT_InventoryReport(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// product lists
export function getProductLists(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    sequelize.query('CALL BI_ENT_Dashboard(' + queryData + ')')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Annual Product Trend  Sales
export function getEntProductTrendSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('annual product trend  sales', queryData);
    sequelize.query('CALL BI_ENT_Product_Trend_Sales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Annual Product Trend Quantity
export function getEntProductTrendQty(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('annual product trend quantity ', queryData);
    sequelize.query('CALL BI_ENT_Product_Trend_Qty(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Annual Distributor Trend Sales
export function getEntDistributorTrendSales(req, res) {
    var queryData = '"'.replace(/"/g, "'") + JSON.stringify(req.body) + '"'.replace(/"/g, "'");
    console.log('annual distributor trend sales ', queryData);
    sequelize.query('CALL BI_ENT_Distributor_Trend_Sales(' + queryData + ');')
        .then(respondWithResult(res))
        .catch(handleError(res));
}