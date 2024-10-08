import {capitalizeFormatter} from "../../../../common/helpers/capitalize-formatter";
import {groupRepository} from "../../../../repositories/groups/group.repository";
import {NextFunction, Request, Response} from "express";
import {studentRepository} from "../../../../repositories/students/student.repository";
import {StudentUpdate} from "../../../database/interfaces/students-table.type";
import {studentValidatorSingleton} from "../../../../common/validators/student.validator";
import ValidationError from "../../../../common/errors/validation.error";

class StudentController {
    public constructor() {
    }

    public async getStudentsFromGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const {group_id} = req.params;

            // Validate that the group exists
            await groupRepository.getGroupById({group_id});

            const students = await studentRepository.getStudentsFromGroup({group_id});

            res.json({
                data: students,
            });
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    public async postStudent(req: Request, res: Response, next: NextFunction) {
        try {
            const {group_id} = req.params;
            const {firstname, lastname, email} = req.body;
            const {isValid, errors, message} = studentValidatorSingleton.validate({
                group_id,
                firstname,
                lastname,
            });

            if (!isValid)
                next(new ValidationError({
                    message: message,
                    code: 403,
                    errors: errors,
                }));

            // Validate that the group exists
            await groupRepository.getGroupById({group_id});

            const student = await studentRepository.createStudentFromGroup({
                group_id,
                firstname: capitalizeFormatter(firstname),
                lastname: capitalizeFormatter(lastname),
                email,
            });

            res.status(201).json({
                data: student,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getStudentById(req: Request, res: Response, next: NextFunction) {
        try {
            const {student_id} = req.params;

            const {isValid, errors, message} = studentValidatorSingleton.validate({student_id});

            if (!isValid)
                next(new ValidationError({
                    message: message,
                    code: 403,
                    errors: errors,
                }));

            const student = await studentRepository.getStudentByID({student_id}, true);

            res.json({
                data: student,
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteStudentFromGroup(req: Request, res: Response, next: NextFunction) {
        try {
            const {group_id, student_id} = req.params;
            const {isValid, errors, message} = studentValidatorSingleton.validate({group_id, student_id});

            if (!isValid)
                next(new ValidationError({
                    message: message,
                    code: 403,
                    errors: errors,
                }));

            // Validate that the group exists
            await groupRepository.getGroupById({group_id});

            await studentRepository.deleteStudentFromGroup({student_id, group_id});

            res.status(204).json();
        } catch (e) {
            next(e);
        }
    }

    public async updateStudentById(req: Request, res: Response, next: NextFunction) {
        try {
            const {student_id} = req.params;
            if (student_id) {
                let {isValid, errors, message} = studentValidatorSingleton.validate({student_id});
                if (!isValid) next(new ValidationError({message, code: 403, errors}));
            }

            const studentCredentials = req.body as Omit<StudentUpdate, "student_id" | "group_id">;
            if (studentCredentials) {
                const {isValid, errors, message} = studentValidatorSingleton.validate({
                    firstname: studentCredentials.firstname,
                    lastname: studentCredentials.lastname,
                    email: studentCredentials.email,
                });
                if (!isValid) next(new ValidationError({message, code: 403, errors}));
            }

            await studentRepository.getStudentByID({student_id});

            await studentRepository.updateStudentById(student_id, studentCredentials);

            res.status(200).json();
        } catch (e) {
            next(e);
        }
    }
}

export const studentController = new StudentController();
