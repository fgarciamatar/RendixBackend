
const { Router } = require("express");
const UserRouter = require("./UserRouter")
const CompanyRouter = require("./CompanyRouter")
const superAdminRouter = require("./superAdminRouter")

const router = Router();
router.use("/", superAdminRouter)
router.use("/", CompanyRouter);
router.use("/", UserRouter);

module.exports = router;
