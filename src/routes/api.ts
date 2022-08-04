import { inputData } from "../models/inputData";

import { Router, Request } from "express";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

import fs from "fs";
import _path from "path";

function cleanUserInput(req: Request) {
	const dateOfSubmission = req.body.dateOfSubmission as { month: string; date: string; year: string };
	const professor = req.body.professor as { name: string; department: string };
	const student = req.body.student as { name: string; gender: string; team: string; title?: string };
	const classDetails = req.body.class as {
		courseCode: string;
		section: string;
		numberOfAbsences: number;
		fromTime: string;
		fromMeridiem: string;
		toTime: string;
		toMeridiem: string;
		mondaySchedule?: string;
		tuesdaySchedule?: string;
		wednesdaySchedule?: string;
		thursdaySchedule?: string;
		fridaySchedule?: string;
		saturdaySchedule?: string;
	};
	const event = req.body.event as {
		month: string;
		date: number;
		year: number;
		name: string;
		venue: string;
		calltime: string;
		meridiem: string;
	};
	const notee = req.body.notee as { name: string; title: string };
	const renameFile = req.body.renameFile as string;

	let preferredPronouns = "";

	if (student.gender == "Male") {
		preferredPronouns = "He is";
	} else if (student.gender == "Female") {
		preferredPronouns = "She is";
	} else {
		preferredPronouns = "They are";
	}

	let classSchedule = "";

	if (classDetails.mondaySchedule) {
		classSchedule += "M";
	}

	if (classDetails.tuesdaySchedule) {
		classSchedule += "T";
	}

	if (classDetails.wednesdaySchedule) {
		classSchedule += "W";
	}

	if (classDetails.thursdaySchedule) {
		classSchedule += "H";
	}

	if (classDetails.fridaySchedule) {
		classSchedule += "F";
	}

	if (classDetails.saturdaySchedule) {
		classSchedule += "S";
	}

	let eventDay = "";
	const eventDate = new Date(`${event.month} ${event.date} ${event.year}`);

	switch (eventDate.getDay()) {
		case 0:
			eventDay = "Sunday";
			break;
		case 1:
			eventDay = "Monday";
			break;
		case 2:
			eventDay = "Tuesday";
			break;
		case 3:
			eventDay = "Wednesday";
			break;
		case 4:
			eventDay = "Thursday";
			break;
		case 5:
			eventDay = "Friday";
			break;
		case 6:
			eventDay = "Saturday";
	}

	const returnData: inputData = {
		currentMonth: dateOfSubmission.month,
		currentDate: Number(dateOfSubmission.date),
		currentYear: Number(dateOfSubmission.year),
		professorName: professor.name,
		professorDepartment: professor.department,
		studentName: student.name,
		studentGender: preferredPronouns,
		courseCode: classDetails.courseCode,
		section: classDetails.section,
		classSchedule: classSchedule,
		time: `${classDetails.fromTime} ${classDetails.fromMeridiem} - ${classDetails.toTime} ${classDetails.toMeridiem}`,
		eventMonth: event.month,
		eventDate: Number(event.date),
		eventYear: Number(event.year),
		eventName: event.name,
		eventDay: eventDay,
		eventVenue: event.venue,
		eventCalltime: `${event.calltime} ${event.meridiem}`,
		absences: Number(classDetails.numberOfAbsences),
		team: student.team,
		title: student.title || "",
		noteeName: notee.name,
		noteeTitle: notee.title,
	};

	if (renameFile) {
		returnData.renameFile = renameFile;
	}

	return returnData;
}

const router = Router();

router.get("/", function (req, res) {
	res.render("index");
});

router.post("/document", function (req, res) {
	// TODO: Validate, sanitize, and clean input
	const cleanedData = cleanUserInput(req);

	console.log(cleanedData);

	// Load the docx file as binary content
	const templateFile = fs.readFileSync(_path.resolve(__dirname, "../../public/assets/Template.docx"), "binary");

	const zippedTemplate = new PizZip(templateFile);

	const document = new Docxtemplater(zippedTemplate, { linebreaks: true });

	// Render the document along with the necessary information
	document.render({
		Current_Month: cleanedData.currentMonth,
		Current_Date: cleanedData.currentDate,
		Current_Year: cleanedData.currentYear,
		Professor_Name: cleanedData.professorName,
		Professor_Department: cleanedData.professorDepartment,
		Student_Name: cleanedData.studentName,
		Course_Code: cleanedData.courseCode,
		Section: cleanedData.section,
		Days: cleanedData.classSchedule,
		Time: cleanedData.time,
		Event_Month: cleanedData.eventMonth,
		Event_Date: cleanedData.eventDate,
		Event_Year: cleanedData.eventYear,
		Gender: cleanedData.studentGender,
		Team: cleanedData.team,
		Assigned_Event: cleanedData.eventName,
		Event_Day: cleanedData.eventDay,
		Event_Venue: cleanedData.eventVenue,
		Event_Calltime: cleanedData.eventCalltime,
		Absences: cleanedData.absences,
		Title: cleanedData.title,
		Notee: cleanedData.noteeName,
		Notee_Title: cleanedData.noteeTitle,
	});

	const buffer = document.getZip().generate({
		type: "nodebuffer",
		compression: "DEFLATE",
	});

	let filePath = "";

	// Checks if the user wants to rename the file
	if (cleanedData.renameFile) {
		filePath = `../../public/assets/${cleanedData.renameFile}.docx`;
	} else {
		filePath = `../../public/assets/AAF.docx`;
	}

	// Checks if the file exists
	if (fs.existsSync(_path.resolve(__dirname, filePath))) {
		// If it does, delete it first
		fs.unlinkSync(_path.resolve(__dirname, filePath));
	}

	// Generates the file
	fs.writeFileSync(_path.resolve(__dirname, filePath), buffer);

	// Downloads the file
	res.download(_path.resolve(__dirname, filePath));
});

export default router;
