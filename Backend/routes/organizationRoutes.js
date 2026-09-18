const express = require("express");
const Organization = require("../models/Organization");
const { auth, roles } = require("../middleware/auth");
const { fail, ok, asyncRoute, validId } = require("../utils/http");

const router = express.Router();

const writableFields = [
  "name",
  "registrationNumber",
  "type",
  "description",
  "mission",
  "email",
  "phone",
  "contact",
  "address",
  "province",
  "city",
];

function pickFields(source, fields) {
  return fields.reduce((result, field) => {
    if (source[field] !== undefined) result[field] = source[field];
    return result;
  }, {});
}

router.post("/", auth, roles("organization"), asyncRoute(async (req, res) => {
  const organization = new Organization({
    ...pickFields(req.body || {}, writableFields),
    userId: req.user._id,
  });
  const savedOrganization = await organization.save();

  return ok(res, { organization: savedOrganization }, 201);
}));

router.get("/", asyncRoute(async (req, res) => {
  const organizations = await Organization.find({ isVerified: true })
    .select("_id name type description mission province city isVerified")
    .lean();
  return ok(res, { items: organizations });
}));

router.get("/:id", asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid ID");
  const organization = await Organization.findOne({ _id: req.params.id, isVerified: true })
    .select("_id name type description mission province city isVerified")
    .lean();
  return organization
    ? ok(res, { organization })
    : fail(res, 404, "Organization not found");
}));

router.put("/:id", auth, roles("organization", "admin"), asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid ID");
  const query = req.user.role === "admin"
    ? { _id: req.params.id }
    : { _id: req.params.id, userId: req.user._id };
  const organization = await Organization.findOneAndUpdate(
    query,
    { $set: pickFields(req.body || {}, writableFields) },
    { new: true, runValidators: true }
  );

  if (!organization) return fail(res, 404, "Organization not found or not owned by this account");

  return ok(res, { organization });
}));

router.delete("/:id", auth, roles("admin"), asyncRoute(async (req, res) => {
  if (!validId(req.params.id)) return fail(res, 400, "Invalid ID");
  const organization = await Organization.findByIdAndDelete(req.params.id);

  if (!organization) return fail(res, 404, "Organization not found");

  return ok(res, { message: "Organization deleted successfully" });
}));

module.exports = router;