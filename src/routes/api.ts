import { Router } from "express";

const router = Router();

router.get("/", function (req, res) {
	res.render("index");
});

router.post("/document", function (req, res) {
	const inputData = Object.entries(req.body);

	console.log(inputData);
});

export default router;
