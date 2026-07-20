const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log(
  "OPENAI_API_KEY loaded:",
  process.env.OPENAI_API_KEY ? "YES" : "NO"
);

app.post("/workout", async (req, res) => {
  const {
    name,
    age,
    weight,
    height,
    goal,
    experience,
    equipment,
    days,
    duration,
  } = req.body;

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `
You are a certified personal trainer.

Create a personalized one-week workout plan using the information below.

User Information:
- Name: ${name}
- Age: ${age}
- Weight: ${weight} lbs
- Height: ${height}
- Goal: ${goal}
- Experience Level: ${experience}
- Available Equipment: ${equipment}
- Workout Days Per Week: ${days}
- Preferred Workout Length: ${duration}

Please include:

1. User Summary
2. Weekly Workout Schedule
3. Daily Workouts
4. Rest Days
5. Nutrition Tips
6. Motivation

IMPORTANT FORMATTING RULES:

- Return plain text only.
- Do NOT use Markdown.
- Do NOT use #, ##, or ### headings.
- Do NOT use **bold**.
- Do NOT use tables.
- Do NOT use | characters.
- Do NOT use horizontal lines like ---.
- Use only simple headings and bullet points.

Use this format exactly:

Personalized Workout Plan for ${name}

User Summary
- Goal: ${goal}
- Experience: ${experience}
- Weight: ${weight} lbs
- Height: ${height}
- Workout Days: ${days}
- Workout Duration: ${duration}

Weekly Workout Schedule
- Monday: Full Body Strength
- Tuesday: Cardio
- Wednesday: Rest
- Thursday: Upper Body
- Friday: Lower Body
- Saturday: Cardio
- Sunday: Rest

Daily Workouts

Monday

Warm-up
- 5 minute treadmill walk
- Dynamic stretching

Exercises
- Squats: 3 sets x 10 reps
- Bench Press: 3 sets x 10 reps
- Bent-over Rows: 3 sets x 10 reps

Cool-down
- Stretch for 5 minutes

Continue this same format for the remaining workout days.

Rest Days
- Explain what to do on rest days.

Nutrition Tips
- Give 4 to 6 practical nutrition tips based on the user's goal.

Motivation
Write a short motivational message addressed directly to ${name}.

Do not include any Markdown formatting or special symbols other than simple bullet points.
`,
    });

    res.json({
      workout: response.output_text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to generate workout.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});