<h1 align="center">
    AAF Maker
    <br>
    <img alt="AAF Maker above the fold" height="300" width="300" src="https://github.com/JSintos/AAF-Maker/blob/master/screenshot.png?raw=true">
</h1>

This project makes it easier for Lasallian student athletes to create AAFs (approved absence forms). AAFs, in a gist, are documents that student athletes submit to the Office of Sports Development to be excused in their classes to attend events organized by their sport.

This project was built with love using Node, Express, Typescript, and Docxtemplater.

## How it works

After form submission, the backend, created using an Express router, collects the inputted data the user entered and cleans it. Afterwards, it creates a new document file using docxtemplater and renders the file along with the necessary information it needs. It then lets the user download the file after.

## Usage

-   Input all of the necessary information such as the professor's name and department and the details about the event.
-   You may rename the file by inputting the new file name in the input field next to the 'Reset' button.
-   After you're done and content with the inputted information, press the 'Submit' button and the file should be downloaded to your machine.
-   **Make sure to double check the file after receiving it.**
