import React, { useState } from 'react';
import axios from 'axios';
import './nutrition.css';
import NutritionTable from './NutritionTable';
import SideNavbar from '../../components/sidenav/SideNavbar';
import { useNavigate } from 'react-router-dom';

function Nutrition() {
    const [nutritionalData, setNutritionalData] = useState(null);
    const [ingredient, setIngredient] = useState('');

    const navigate = useNavigate();

    const fetchNutritionData = async () => {
        try {
            const response = await axios.post('http://localhost:9999/nutrition', {
                ingredient: ingredient
            });
            setNutritionalData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const navigateToDietPlan = () => {
        navigate('/diet-plan'); // Navigate to Diet Plan page
    };

    return (
        <div className="nutriton-container">
            <SideNavbar/>
            <div className="main-content1">
                <h1 className="nutrition-h1">Nutrition Analysis</h1>
                    <div className="nutrition-form-group">
                        <input
                        type="text"
                        className="nutrition-form-control"
                        placeholder="Enter ingredient"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        /><br/>
                        <button className="nutrition-btn" onClick={fetchNutritionData}>Analyse</button>
                        <h2 className="nutrition-h2">or</h2>
                        <button className="nutrition-btn1" onClick={navigateToDietPlan}>Recommend a Diet Plan</button>
                    </div>
                {nutritionalData && <NutritionTable data={nutritionalData} />}
            </div>
        </div>
    );
}

export default Nutrition;
