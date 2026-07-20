import ReactMarkdown from "react-markdown";
import "./App.css";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [equipment, setEquipment] = useState("");
  const [days, setDays] = useState("");
  const [duration, setDuration] = useState("");

  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState("");

  async function generateWorkout() {
    setLoading(true);
    setWorkout("");

    try {
      const response = await fetch("https://fitnesscoachai.onrender.com/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          weight,
          height,
          goal,
          experience,
          equipment,
          days,
          duration,
        }),
      });

      const data = await response.json();
      setWorkout(data.workout);
    } catch (error) {
      console.error(error);
      setWorkout("Error generating workout.");
    }

    setLoading(false);
  }

  function resetForm() {
    setName("");
    setAge("");
    setWeight("");
    setHeight("");
    setGoal("");
    setExperience("");
    setEquipment("");
    setDays("");
    setDuration("");
    setWorkout("");
  }

  return (
    <div className="container">
      <h1>🏋️ Fitness Coach AI</h1>

<h2>Your Personal AI Trainer</h2>

<p className="creator">Created by Skyler LaFisca</p>

<p>Create your own personalized AI workout plan.</p>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        placeholder="Weight (lbs)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <input
        placeholder="Height (ex. 5'5)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />

      <select value={goal} onChange={(e) => setGoal(e.target.value)}>
        <option value="">Fitness Goal</option>
        <option>Lose Weight</option>
        <option>Build Muscle</option>
        <option>Increase Strength</option>
        <option>Improve Endurance</option>
      </select>

      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
      >
        <option value="">Experience Level</option>
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <select
        value={equipment}
        onChange={(e) => setEquipment(e.target.value)}
      >
        <option value="">Equipment</option>
        <option>None</option>
        <option>Dumbbells</option>
        <option>Resistance Bands</option>
        <option>Full Gym</option>
      </select>

      <select value={days} onChange={(e) => setDays(e.target.value)}>
        <option value="">Workout Days Per Week</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>

      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      >
        <option value="">Workout Duration</option>
        <option>30 Minutes</option>
        <option>45 Minutes</option>
        <option>60 Minutes</option>
      </select>

      <button onClick={generateWorkout}>
        Generate Workout Plan
      </button>

      <button
        className="resetButton"
        onClick={resetForm}
      >
        Reset Form
      </button>

      {loading && (
        <h3>🏋️ Generating your personalized workout...</h3>
      )}

      {workout && (
        <div className="workout">
          <h2>Your Workout Plan</h2>
          <ReactMarkdown>{workout}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default App;