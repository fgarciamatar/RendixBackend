const { Router } = require("express");
const UserRouter = require("./UserRouter");

const superAdminRouter = require("./superAdminRouter");
const TransferRouter = require("./TransferRouter");
const CajaRouter = require("./CajaRouter");

const router = Router();
router.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

router.use("/", superAdminRouter); //LLEVA TOKEN SA

router.use("/", UserRouter); // lLEVA TOKEN SA PERO PARA **TRAER USUARIOS LLEVA LOS DOS
router.use("/", TransferRouter); // LLEVA TOKEN **USER
router.use("/", CajaRouter); // LLEVA TOKEN **USER
module.exports = router;
