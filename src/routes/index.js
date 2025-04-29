
const { Router } = require("express");
const UserRouter = require("./UserRouter")
const CompanyRouter = require("./CompanyRouter")

const router = Router();
router.use("/", UserRouter);
router.use("/", CompanyRouter);

module.exports = router;
