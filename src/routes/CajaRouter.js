const express = require("express");
const router = express.Router();
const {
  createSheetController,
  getSheetByDateController
} =  require("../controllers/SheetsControllers");

const {
  createCashDetailController,
  getCashDetailByCashBoxIdController,
  deleteCashDetailByCashBoxIdController,
} = require("../controllers/CashDetailController");

//PLanilla
// -crear
router.post("/createSheet", createSheetController);
// -Traer por fecha
router.post("/getSheetByDate", getSheetByDateController);

// DETALLE EFECTIVO

router.post("/createCashDetail", createCashDetailController);
//-traer por id caja
router.get(
  "/getCashDetailByCashBoxId/:cashboxId",
  getCashDetailByCashBoxIdController
);
//-eliminar por id caja
router.delete(
  "/deleteCashDetailByCashBoxId/:cashboxId",
  deleteCashDetailByCashBoxIdController
);

module.exports = router;
