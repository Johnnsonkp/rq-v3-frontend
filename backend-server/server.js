const express = require("express");
const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env." });
const cors = require("cors");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 5000;
const HOST = "localhost";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});
const databaseId = process.env.NOTION_DATABASE_ID;

app.get("/fetchNotionData", jsonParser, async (req, res) => {
  try {
    const defaultResponse = await notion.databases.query({
      database_id: databaseId,
    });

    let resultArr = [];
    for (let i = 0; i < defaultResponse.results.length; i++) {
      let quizObj = {
        question:
          defaultResponse.results[i].properties.Question.title[0].text.content,
        correct_answer:
          defaultResponse.results[i].properties["Correct Answer"].rich_text[0]
            .plain_text,
        incorrect_answers: [
          defaultResponse.results[i].properties["Incorrect Answer-1"]
            .rich_text[0].plain_text,
          defaultResponse.results[i].properties["Incorrect Answer-2"]
            .rich_text[0].plain_text,
          defaultResponse.results[i].properties["Incorrect Answer-3"]
            .rich_text[0].plain_text,
        ],
      };
      resultArr.push(quizObj);
    }
    console.log("localhost: 5000", PORT);
    console.log("resultArr", resultArr);
    // return resultArr;
    res.send(resultArr);
  } catch (error) {
    console.log(error);
  }
});

app.post("/submitFormToNotion", jsonParser, async (req, res) => {
  const question = req.body.question;
  const correctAnswer = req.body.correctAnswer;
  const incorrectAnswer = req.body.incorrectAnswer;

  console.log("app.post", {
    question: question,
    correctAnswer: correctAnswer,
    incorrectAnswer: incorrectAnswer,
  });

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Question: {
          title: [
            {
              text: {
                content: question,
              },
            },
          ],
        },
        "Correct Answer": {
          rich_text: [
            {
              text: {
                content: correctAnswer,
              },
            },
          ],
        },
        "Incorrect Answer-1": {
          rich_text: [
            {
              text: {
                content: incorrectAnswer[0],
              },
            },
          ],
        },
        "Incorrect Answer-2": {
          rich_text: [
            {
              text: {
                content: incorrectAnswer[1],
              },
            },
          ],
        },
        "Incorrect Answer-3": {
          rich_text: [
            {
              text: {
                content: incorrectAnswer[2],
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("SUCCESS!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Starting proxy at ${HOST} : ${PORT}`);
});
