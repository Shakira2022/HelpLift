const express = require("express");
const router = express.Router();
const Giver = require("../models/Giver");
const { auth, roles } = require("../middleware/auth");
const { fail, ok, asyncRoute, validId } = require("../utils/http");

const writableFields = [
  "name",
  "email",
  "phone",
  "type",
  "preferredCategories",
  "preferredLocations",
  "supportTypes",
  "publicDisplayName",
  "anonymousPreference",
];

function pickFields(source, fields) {
  return fields.reduce((result, field) => {
    if (source[field] !== undefined) result[field] = source[field];
    return result;
  }, {});
}

router.post("/", auth, roles("giver"), asyncRoute(async (req, res) => {
  const giver = new Giver({
    ...pickFields(req.body || {}, writableFields),
    userId: req.user._id,
  });
  const savedGiver = await giver.save();

  return ok(res, { giver: savedGiver }, 201);
}));

router.get("/", asyncRoute(async (req, res) => {
  const givers = await Giver.find()
    .select("_id publicDisplayName type preferredCategories preferredLocations supportTypes")
    .lean();
  return ok(res, {
    items: givers.map(({ publicDisplayName, ...giver }) => ({
      ...giver,
      name: publicDisplayName || "Anonymous giver",
    })),
  });
}));

router.get("/:id", asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid ID");
  const giver = await Giver.findById(req.params.id)
    .select("_id publicDisplayName type preferredCategories preferredLocations supportTypes")
    .lean();

  if (!giver) return fail(res, 404, "Giver not found");

  const { publicDisplayName, ...publicGiver } = giver;
  return ok(res, { giver: { ...publicGiver, name: publicDisplayName || "Anonymous giver" } });
}));

router.put("/:id", auth, roles("giver", "admin"), asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid ID");
  const query = req.user.role === "admin"
    ? { _id: req.params.id }
    : { _id: req.params.id, userId: req.user._id };
  const giver = await Giver.findOneAndUpdate(
    query,
    { $set: pickFields(req.body || {}, writableFields) },
    { new: true, runValidators: true }
  );

  if (!giver) return fail(res, 404, "Giver not found or not owned by this account");

  return ok(res, { giver });
}));

router.delete("/:id", auth, roles("admin"), asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid ID");
  const giver = await Giver.findByIdAndDelete(req.params.id);

  if (!giver) return fail(res, 404, "Giver not found");

  return ok(res, { message: "Giver deleted successfully" });
}));

module.exports = router;