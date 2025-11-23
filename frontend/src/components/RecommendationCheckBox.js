import React from "react";
import "./RecommendationCheckBox.css";

export default function RecommendationCheckBox({ checked, onChange }) {
    return (
        <label className="rec-checkbox">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={e => onChange(e.target.checked)} 
            />
            <span className="checkmark"></span>
        </label>
    );
}
