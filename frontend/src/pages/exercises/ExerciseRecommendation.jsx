import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import SideNavBar from '../../components/sidenav/SideNavbar';
import './exercise.css';

const bodyParts = [
  "abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system", 
  "delts", "forearms", "glutes", "hamstrings", "lats", "levator scapulae", 
  "pectorals", "quads", "serratus anterior", "spine", "traps", "triceps", "upper back"
];

const ExerciseRecommendation = () => {
  const [bodyPart, setBodyPart] = useState('');
  const [activity, setActivity] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [tableData, setTableData] = useState(null);

  const handleRecommend = async () => {
    try {
      const response = await fetch(`http://localhost:9999/exercise/${bodyPart}`);
      const data = await response.json();
      const formattedData = data.map((exercise) => ({
        Name: exercise.name,
        Target: exercise.target,
        Equipment: exercise.equipment,
        "Secondary Muscles": exercise.secondaryMuscles.join(', '),
        Instructions: exercise.instructions.join('. '),
        "GIF": <a href={exercise.gifUrl} target="_blank" rel="noopener noreferrer">View</a>,
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleSubmitActivity = async () => {
    try {
      const response = await fetch('http://localhost:9999/activity/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityName: activity,
          weight: weight, // replace with dynamic weight if available
          duration: duration, // dynamic duration
        }),
      });
      const data = await response.json();
      const formattedData = data.map((activityData) => ({
        Activity: activityData.activityName,
        "Total Calories": activityData.totalCalories,
      }));
      setTableData(formattedData);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  };

  return (
    <div className="sideNavBar-exercise">
      <SideNavBar />
      <div className="exercise-recommendation">
        <div className="exercise-recommendation__inputs">
          <div className="exercise-recommendation__input-card">
            <h2 className="exercise-recommendation__title">Recommendations for Exercises</h2>
            <select
              className="exercise-recommendation__input"
              value={bodyPart}
              onChange={(e) => setBodyPart(e.target.value)}
            >
              <option value="" disabled>Select Body Part</option>
              {bodyParts.map((part, index) => (
                <option key={index} value={part}>{part}</option>
              ))}
            </select>
            <button
              className="exercise-recommendation__button"
              onClick={handleRecommend}
            >
              Recommend
            </button>
          </div>
          <div className="exercise-recommendation__input-card">
            <h2 className="exercise-recommendation__title">Enter an activity</h2>
            <input
              type="text"
              placeholder="Activity name (e.g., cycling)"
              className="exercise-recommendation__input"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Set your current weight (in Kg)"
              className="exercise-recommendation__input"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="text"
              placeholder="Duration (in minutes)"
              className="exercise-recommendation__input"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <button
              className="exercise-recommendation__button"
              onClick={handleSubmitActivity}
            >
              Submit
            </button>
          </div>
        </div>
        {tableData && (
          <div className="exercise-recommendation__table-container">
            <h3 className="exercise-recommendation__table-title">Table Data</h3>
            <TableContainer component={Paper}>
              <Table className="exercise-recommendation__table">
                <TableHead>
                  <TableRow>
                    {Object.keys(tableData[0]).map((header) => (
                      <TableCell key={header}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      {Object.values(row).map((value, cellIndex) => (
                        <TableCell key={cellIndex}>{value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseRecommendation;
