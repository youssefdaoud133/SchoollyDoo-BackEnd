const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const FindHelpInError = require("../utils/SomeUsefulFunction.js/HelpInError");
const { json } = require("express");
const ApiClassError = require("../utils/ApiClassError");
const ApplyModel = require("../models/ApplyModel");
const Apply = require("../models/ApplyModel");

const {
  getuploadedprofilepicturefromapply,
} = require("../services/getawsservices");

class CrudHelper {
  constructor(model) {
    this.model = require(`../models/${model}`);
  }

  createHandler = asyncHandler(async (req, res, next) => {
    if (req.body.username) {
      req.body.slug = slugify(req.body.username);
    }
    if (req.body.schoolname) {
      req.body.slug = slugify(req.body.schoolname);
    }
    if (req.body.owner && req.body.to && req.body.school && req.body.as) {
      const Apply = await ApplyModel.findOne({
        to: req.body.to,
        owner: req.body.owner,
        school: req.body.school,
      });
      if (Apply) {
        return next(
          new ApiClassError(
            `you already applied to this school [${req.body.schoolname}]`,
            501
          )
        );
      }
    }

    const newData = await this.model.create(req.body);
    res.status(201).json(newData);
  });

  readAllHandler = asyncHandler(async (req, res) => {
    // req.body.slug = slugify(req.body.username);
    const data = await this.model.find();
    res.status(200).json({ result: data.length, data });
  });
  readAllHandlerAndPopulate = asyncHandler(async (req, res) => {
    // req.body.slug = slugify(req.body.username);
    const data = await this.model.find().populate("owner");
    res.status(200).json({ result: data.length, data });
  });
  readAllHandlerUnactiveSchool = asyncHandler(async (req, res) => {
    if (req.user.role === "manager") {
      const data = await this.model.find({ active: false }).populate("owner");
      res.status(200).json({ result: data.length, data });
    } else {
      const data = { msg: "you should be manager" };
      res.status(401).json({ result: 0, data });
    }
  });
  readAllHandlerUnactiveApply = asyncHandler(async (req, res) => {
    if (req.user.role === "leader") {
      const data = await this.model
        .find({ active: false })
        .populate("owner")
        .populate("school");
      // for (let i = 0; i < data.length; i++) {
      //   data[i].owner.profileIMG = await getuploadedprofilepicturefromapply(
      //     data[i].owner.profileIMG
      //   );
      // }

      res.status(200).json({ result: data.length, data });
    } else {
      const data = { msg: "you should be manager" };
      res.status(401).json({ result: 0, data });
    }
  });

  readAllHandlermySchool = asyncHandler(async (req, res) => {
    if (req.user.role === "leader") {
      const data = await this.model
        .find({ owner: req.body.owner })
        .populate("owner");
      res.status(200).json({ result: data.length, data });
    } else {
      const data = { msg: "you should be leader" };
      res.status(401).json({ result: 0, data });
    }
  });

  readOneHandler = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (FindHelpInError(id)) {
      const data = await this.model.findById(id).lean();
      if (!data) {
        console.log(`Couldn't find`);
        return next(new ApiClassError(`Couldn't find this id ${id}`, 404));
      } else {
        res.status(200).json(data);
      }
    } else {
      next(new ApiClassError(`invalid id`, 500));
    }
  });

  readOneSchool = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (FindHelpInError(id)) {
      const data = await this.model.findById(id).lean().populate("owner");
      if (!data) {
        console.log(`Couldn't find`);
        return next(new ApiClassError(`Couldn't find this id ${id}`, 404));
      } else {
        res.status(200).json(data);
      }
    } else {
      next(new ApiClassError(`invalid id`, 500));
    }
  });

  updateHandler = asyncHandler(async (req, res, next) => {
    if (req.body.username) req.body.slug = slugify(req.body.username);
    const { id } = req.params;
    if (FindHelpInError(id)) {
      const updatedData = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedData) {
        return next(new ApiClassError(`Couldn't find this id ${id}`, 404));
      } else {
        res.status(200).json(updatedData);
      }
    } else {
      next(new ApiClassError(`invalid id`, 500));
    }
  });

  deleteHandler = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (FindHelpInError(id)) {
      const deletedData = await this.model.findByIdAndDelete(id);
      if (!deletedData) {
        return next(new ApiClassError(`Couldn't find this id ${id}`, 404));
      } else {
        res.status(200).json({
          message: `user that has username ${deletedData.username} is deleted`,
        });
      }
    } else {
      next(new ApiClassError(`invalid id`, 500));
    }
  });

  // notifications crud
  ReadAllNotifications = asyncHandler(async (req, res) => {
    let roledata = [];
    let todata = [];
    switch (req.user.role) {
      case "manager":
        roledata = await this.model
          .find({ to_manager: true, read: false })
          .sort({ timestamp: -1 })
          .populate("owner");
        break;
      default:
        roledata = [];
      // Code to be executed when none of the cases match the expression
    }

    todata = await this.model
      .find({ to: req.body.owner, read: false })
      .populate("to")
      .populate("owner")
      .sort({ timestamp: -1 });

    let data = [...roledata, ...todata];

    // for (let i = 0; i < data.length; i++) {
    //   data[i].owner.profileIMG = await getuploadedprofilepicturefromapply(
    //     data[i].owner.profileIMG
    //   );
    // }
    res.status(200).json({ result: data.length, data });
  });
  makeReadAllNotifications = asyncHandler(async (req, res) => {
    try {
      const data = await this.model.updateMany(
        { _id: { $in: req.body.ids } },
        { read: true }
      );
      console.log("Notifications updated successfully:", data);
      res.status(200).json({ success: true, data });
    } catch (err) {
      console.error("Error updating notifications:", err);
      res
        .status(500)
        .json({ success: false, error: "Error updating notifications" });
    }
  });

  makeReadOneNotifications = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (FindHelpInError(id)) {
      const updatedData = await this.model.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedData) {
        return next(new ApiClassError(`Couldn't find this id ${id}`, 404));
      } else {
        res.status(200).json(updatedData);
      }
    } else {
      next(new ApiClassError(`invalid id`, 500));
    }
  });
}

module.exports = CrudHelper;
