function setDateFields() {
	const dateObject = new Date();

	let currentMonth = "";

	switch (dateObject.getMonth()) {
		case 0:
			currentMonth = "January";
			break;
		case 1:
			currentMonth = "February";
			break;
		case 2:
			currentMonth = "March";
			break;
		case 3:
			currentMonth = "April";
			break;
		case 4:
			currentMonth = "May";
			break;
		case 5:
			currentMonth = "June";
			break;
		case 6:
			currentMonth = "July";
			break;
		case 7:
			currentMonth = "August";
			break;
		case 8:
			currentMonth = "September";
			break;
		case 9:
			currentMonth = "October";
			break;
		case 10:
			currentMonth = "November";
			break;
		case 11:
			currentMonth = "December";
	}

	// Sets the default value of the "Date of Submission" and "Event" date fields to the currrent date
	const dosMonth = document.getElementById("dosMonth") as HTMLSelectElement;
	dosMonth.value = currentMonth;

	const eventMonth = document.getElementById("eventMonth") as HTMLSelectElement;
	eventMonth.value = currentMonth;

	const dosDate = document.getElementById("dosDate") as HTMLInputElement;
	dosDate.value = "" + dateObject.getDate();

	const eventDate = document.getElementById("eventDate") as HTMLInputElement;
	eventDate.value = "" + dateObject.getDate();

	const eventYear = document.getElementById("eventYear") as HTMLInputElement;
	eventYear.value = "" + dateObject.getFullYear();
}

setDateFields();

const resetButton = document.getElementById("yesOption") as HTMLButtonElement;
resetButton.addEventListener("click", () => {
	setDateFields();

	const inputElements = document.querySelectorAll(
		"input:not(#dosDate):not(#dosYear):not(#numberOfAbsences):not(input[type='checkbox']):not(#eventDate):not(#eventYear)"
	);

	inputElements.forEach((inputElement) => {
		(inputElement as HTMLInputElement).value = "";
	});

	const studentGender = document.getElementById("studentGender") as HTMLSelectElement;
	studentGender.value = "Male";

	const numberOfAbsences = document.getElementById("numberOfAbsences") as HTMLInputElement;
	numberOfAbsences.value = "0";

	const fromAM = document.getElementById("fromAM") as HTMLInputElement;
	fromAM.checked = true;

	const toAM = document.getElementById("toAM") as HTMLInputElement;
	toAM.checked = true;

	const scheduleCheckboxes = document.querySelectorAll("input[type='checkbox']");
	scheduleCheckboxes.forEach((scheduleCheckbox) => {
		(scheduleCheckbox as HTMLInputElement).checked = false;
	});

	const calltimeAM = document.getElementById("calltimeAM") as HTMLInputElement;
	calltimeAM.checked = true;

	const noOption = document.getElementById("noOption") as HTMLButtonElement;
	noOption.click();
});
