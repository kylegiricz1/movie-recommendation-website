import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import "./Wizard.css";

const QUESTIONS = [
    { 
        id: "genres", 
        text: "What genres do you prefer? (Select multiple)", 
        type: "multiChoice", 
        options: ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller", "Fantasy", "Animation"] 
    },
    { 
        id: "primaryGenre",
        text: "Which ONE genre matters most to you?",
        type: "choice",
        options: ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller", "Fantasy", "Animation"]
    },
    { 
        id: "decades", 
        text: "Which decades do you prefer? (Select multiple)", 
        type: "multiChoice", 
        options: ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"] 
    },
    {
        id: "recentness",
        text: "How important is the movie being recent?",
        type: "choice",
        options: ["Very Important", "Somewhat Important", "Not Important"]
    },
    { 
        id: "runtime", 
        text: "Preferred movie length?", 
        type: "choice", 
        options: ["Short (< 90min)", "Medium (90-120min)", "Long (> 120min)"] 
    },
    {
        id: "popularity",
        text: "Do you prefer well-known or hidden gem movies?",
        type: "choice",
        options: ["Well-known Blockbusters", "Moderately Popular", "Hidden Gems"]
    },
    { 
        id: "rating", 
        text: "Minimum rating (1-10)", 
        type: "text", 
        placeholder: "e.g. 7" 
    }
];

export default function Wizard() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const q = QUESTIONS[step];

    function updateAnswer(id, value, isMulti = false) {
        if (isMulti) {
            setAnswers(prev => {
                const currentValues = prev[id] || [];
                if (currentValues.includes(value)) {
                    return { ...prev, [id]: currentValues.filter(v => v !== value) };
                } else {
                    return { ...prev, [id]: [...currentValues, value] };
                }
            });
        } else {
            setAnswers(prev => ({ ...prev, [id]: value }));
        }
    }

    function canProceed() {
        const val = answers[q.id];
        if (q.type === "text") return val !== undefined && String(val).trim() !== "";
        if (q.type === "choice") return val !== undefined && val !== "";
        if (q.type === "multiChoice") return Array.isArray(val) && val.length > 0;
        return true;
    }

    async function handleSubmit() {
        setError(null);
        setLoading(true);
        try {
            const resp = await fetch("http://localhost:5200/api/wizard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers })
            });
            if (!resp.ok) throw new Error(`Server responded ${resp.status}`);
            const body = await resp.json();
            if (!body) throw new Error("Empty response from server");
            
            setResult(body);
        } catch (err) {
            setError(err.message || "Request failed");
            setResult(null);
        } finally {
            setLoading(false);
        }
    }

    if (result) {
        return (
            <div>
                <Navbar />
                <div className="wizard-container">
                    <div className="wizard-card">
                        {error && <div className="wizard-error">{error}</div>}
                        {result.noMatches || !result.movie ? (
                            <div className="no-matches">
                                <h2>No Perfect Match Found</h2>
                                <p>{result.message || "Try adjusting your preferences for better results."}</p>
                            </div>
                        ) : (
                            <div className="movie-recommendation">
                                <h2>Your Perfect Movie Match!</h2>
                                <p className="match-message">{result.message}</p>
                                <div className="movie-details">
                                    <h3>{result.movie.title || "Title Not Available"}</h3>
                                    <div className="movie-stats">
                                        {result.movie.release_date && (
                                            <span className="movie-year">({result.movie.release_date.substring(0, 4)})</span>
                                        )}
                                        {result.movie.vote_average && (
                                            <span className="movie-rating">★ {result.movie.vote_average}/10</span>
                                        )}
                                        {result.movie.runtime && (
                                            <span className="movie-runtime">{result.movie.runtime} mins</span>
                                        )}
                                    </div>
                                    {result.movie.overview && (
                                        <p className="movie-overview">{result.movie.overview}</p>
                                    )}
                                    {result.summary && (
                                        <div className="movie-summary">
                                            Why you might like it: {result.summary}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="wizard-controls">
                            <button onClick={() => { setResult(null); setStep(0); setAnswers({}); }}>Try Again</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="wizard-container">
                <div className="wizard-card">
                <h2>Question {step + 1} of {QUESTIONS.length}</h2>

                <label className="wizard-question">{q.text}</label>

                {(q.type === "choice" || q.type === "multiChoice") && (
                    <div className="wizard-options">
                        {q.options.map(opt => (
                            <label key={opt} className="wizard-option">
                                <input
                                    type={q.type === "multiChoice" ? "checkbox" : "radio"}
                                    name={q.id}
                                    value={opt}
                                    checked={q.type === "multiChoice" 
                                        ? (answers[q.id] || []).includes(opt)
                                        : answers[q.id] === opt
                                    }
                                    onChange={() => updateAnswer(q.id, opt, q.type === "multiChoice")}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                )}

                {q.type === "text" && (
                    <input
                        className="wizard-input"
                        type="text"
                        placeholder={q.placeholder || ""}
                        value={answers[q.id] || ""}
                        onChange={(e) => updateAnswer(q.id, e.target.value)}
                    />
                )}

                <div className="wizard-controls">
                    <button
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                        disabled={step === 0 || loading}
                    >
                        Back
                    </button>

                    {step < QUESTIONS.length - 1 ? (
                        <button
                            onClick={() => setStep(s => Math.min(QUESTIONS.length - 1, s + 1))}
                            disabled={!canProceed() || loading}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={!canProceed() || loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    )}
                </div>

                {error && <div className="wizard-error">{error}</div>}
                </div>
            </div>
        </div>
    );
}