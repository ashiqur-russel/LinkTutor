import { TutorServices } from "./Tutor.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";

const getAllTutors = catchAsync(async (req, res) => {
  const result = await TutorServices.getAllTutors(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users are retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});


const getTutorInfo = catchAsync(async (req, res) => {
  const {tutorId} = req.params;
  const result = await TutorServices.getTutorInfo(tutorId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutor Info retieved successfully",
    data: result,
  });
});


const getStudentTutorsList = catchAsync(async (req, res) => {
console.log("getStudentTutorsList")
  const {userId} = req.user;
  const result = await TutorServices.getStudentTutorsList(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Tutor list  for student fetched successfully",
    data: result,
  });
});


export const TutorController = {
  getAllTutors,
  getTutorInfo,
  getStudentTutorsList
};
