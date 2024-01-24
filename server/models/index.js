// Compile model from schema

import { USER_MODELS } from "./user.model.js";
import { COURSE_MODELS } from "./course.model.js";
import { DEPARTMENT_MODELS } from "./department.model.js";
import { TERM_MODELS } from "./term.model.js";
import { BookModel } from "./book.model.js";
import { RoomModel } from "./room.model.js";

// const watchModel = (model) => {
//     model.watch().on("change", (data) => console.log(new Date(), data));
// };

// watchModel(USER_MODELS.UserModel);
// watchModel(COURSE_MODELS.CourseModel);
// watchModel(COURSE_MODELS.CoursePreRegistrationModel);
// watchModel(COURSE_MODELS.CourseRegistrationModel);
// watchModel(DEPARTMENT_MODELS.DepartmentModel);
// watchModel(TERM_MODELS.TermModel);

export const models = {
    UserModel: USER_MODELS.UserModel,
    StudentModel: USER_MODELS.StudentModel,
    ProfessorModel: USER_MODELS.ProfessorModel,
    ItManagerModel: USER_MODELS.ItManagerModel,
    EduManagerModel: USER_MODELS.EduManagerModel,
    CourseModel: COURSE_MODELS.CourseModel,
    TermCourseModel: COURSE_MODELS.TermCourseModel,
    CourseRegistrationModel: COURSE_MODELS.CourseRegistrationModel,
    CoursePreRegistrationModel: COURSE_MODELS.CoursePreRegistrationModel,
    DepartmentModel: DEPARTMENT_MODELS.DepartmentModel,
    TermModel: TERM_MODELS.TermModel,
    BookModel: BookModel,
    RoomModel: RoomModel,
};

export default models;
