const { Router } = require("express");
const UserRouter = require("./UserRouter");
const CompanyRouter = require("./CompanyRouter");
const superAdminRouter = require("./superAdminRouter");
const TransferRouter = require("./TransferRouter");
const CajaRouter = require("./CajaRouter");

const router = Router();
router.use("/", superAdminRouter);
router.use("/", CompanyRouter);
router.use("/", UserRouter);
router.use("/", CajaRouter);
router.use("/", TransferRouter);

module.exports = router;
