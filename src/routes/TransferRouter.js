const express = require("express");
const router = express.Router();
const {
  createTransferController,
  changeStateTransferController,
  getAllTransfersController,
  getTransfersByFiltersController,
  deleteAllTransferController
} = require("../controllers/TransferController");
const { get } = require("mongoose");
const { upload } = require("../middleware/cloudinary");

router.post("/createTransfer",upload.single('receiptImage'),  createTransferController);
//Cambiar estado transfer
router.post("/changeStateTransfer", changeStateTransferController);

// Traer todas las transferencias
router.get("/getAllTransfers", getAllTransfersController);

//FILTRAR POR fecha, estado, vendedor, banco de origen y banco de destino
router.get("/getAllTransfersByFilters",getTransfersByFiltersController)

//BORRAR TODAS LAS TRANSFERENCIAS
router.delete("/deleteAllTransfer", deleteAllTransferController)

module.exports = router;
