import React, { useState } from 'react';
import axios from 'axios';
import './DietPlanForm.css';
import SideNavBar from '../../components/sidenav/SideNavbar';

const DietPlanForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    currentWeight: '',
    medicalConditions: '',
    foodAllergies: '',
    primaryHealthAndNutritionGoals: '',
    dietPreference: '',
    howManyMealsPerDay: '',
    howMuchCaloriesIWantToHit: '',
    foodsYouDislike: ''
  });

  const [dietPlan, setDietPlan] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get('http://localhost:9999/diet', {
      params: {
        ...formData,
        geminiKey: 'AIzaSyCFuEkMDyIOBOJ2rWGm3bBmpAP5i0VZG8g' // Replace with your actual geminiKey
      }
    })
    .then(response => {
      const content = response.data.candidates[0].content.parts[0].text;
      setDietPlan(content);
    })
    .catch(error => {
      console.error('Error generating the diet plan!', error);
    });
  };

  return (
      <div className="diet-plan-container1">
          <SideNavBar />
    <div className="diet-plan-container">
      <h1>Generate Your Custom Diet Plan</h1>
      <form className="diet-plan-form" onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
        <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
        <input type="number" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} required />
        <input type="number" name="currentWeight" placeholder="Current Weight (kg)" value={formData.currentWeight} onChange={handleChange} required />
        <input type="text" name="medicalConditions" placeholder="Medical Conditions" value={formData.medicalConditions} onChange={handleChange} />
        <input type="text" name="foodAllergies" placeholder="Food Allergies" value={formData.foodAllergies} onChange={handleChange} />
        <input type="text" name="primaryHealthAndNutritionGoals" placeholder="Health Goals" value={formData.primaryHealthAndNutritionGoals} onChange={handleChange} required />
        <input type="text" name="dietPreference" placeholder="Diet Preference" value={formData.dietPreference} onChange={handleChange} required />
        <input type="number" name="howManyMealsPerDay" placeholder="Meals Per Day" value={formData.howManyMealsPerDay} onChange={handleChange} required />
        <input type="number" name="howMuchCaloriesIWantToHit" placeholder="Calories Per Day" value={formData.howMuchCaloriesIWantToHit} onChange={handleChange} required />
        <input type="text" name="foodsYouDislike" placeholder="Foods You Dislike" value={formData.foodsYouDislike} onChange={handleChange} />
        <button type="submit">Generate Diet Plan</button>
      </form>

      {dietPlan && (
        <div className="diet-plan-content">
          <h2>Your Custom Diet Plan</h2>
          <div dangerouslySetInnerHTML={{ __html: dietPlan }} />
        </div>
      )}
    </div>
    </div>
  );
};

export default DietPlanForm;
