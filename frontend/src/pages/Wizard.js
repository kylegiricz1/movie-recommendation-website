import React, { useState } from "react";
import Navbar from "../components/Navbar";
import RecommendationCheckBox from "../components/RecommendationCheckBox";
import {Container,Paper,Typography,Button,TextField,FormGroup,FormControlLabel,Checkbox,Radio,RadioGroup,Box,CircularProgress} from "@mui/material";

const QUESTIONS = [
  {
    id: "genres",
    text: "What genres do you prefer? (Select multiple)",
    type: "multiChoice",
    options: ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller", "Fantasy", "Animation"],
  },
  {
    id: "primaryGenre",
    text: "Which ONE genre matters most to you?",
    type: "choice",
    options: ["Action", "Adventure", "Comedy", "Drama", "Sci-Fi", "Horror", "Romance", "Thriller", "Fantasy", "Animation"],
  },
  {
    id: "decades",
    text: "Which decades do you prefer? (Select multiple)",
    type: "multiChoice",
    options: ["1970s", "1980s", "1990s", "2000s", "2010s", "2020s"],
  },
  {
    id: "recentness",
    text: "How important is the movie being recent?",
    type: "choice",
    options: ["Very Important", "Somewhat Important", "Not Important"],
  },
  {
    id: "runtime",
    text: "Preferred movie length?",
    type: "choice",
    options: ["Short (< 90min)", "Medium (90-120min)", "Long (> 120min)"],
  },
  {
    id: "popularity",
    text: "Do you prefer well-known or hidden gem movies?",
    type: "choice",
    options: ["Well-known Blockbusters", "Moderately Popular", "Hidden Gems"],
  },
  {
    id: "rating",
    text: "Minimum rating (1-10)",
    type: "text",
    placeholder: "e.g. 7",
  },
];

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const q = QUESTIONS[step];

  // Save movie locally so it appears in Recommendations
  function saveMovieToLocalStorage(movie) {
    const existing = JSON.parse(localStorage.getItem("savedMovies") || "[]");

    if (!existing.some(m => m.title === movie.title)) {
      existing.push(movie);
      localStorage.setItem("savedMovies", JSON.stringify(existing));
    }
  }

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
        body: JSON.stringify({ answers }),
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
        <Container maxWidth="sm" sx={{ marginTop: 4 }}>
          <Paper sx={{ padding: 3 }}>
            {error && <Typography color="error">{error}</Typography>}

            {result.noMatches || !result.movie ? (
              <Box textAlign="center">
                <Typography variant="h5" color="error" gutterBottom>No Perfect Match Found</Typography>
                <Typography>{result.message || "Try adjusting your preferences for better results."}</Typography>
              </Box>
            ) : (
              <Box textAlign="center">
                <Typography variant="h5" gutterBottom>Your Perfect Movie Match!</Typography>
                <Typography color="success.main" mb={2}>{result.message}</Typography>

                <Paper sx={{ padding: 2, textAlign: "left", backgroundColor: "#f8f9fa" }}>
                  <Typography variant="h6" color="primary">
                    {result.movie.title || "Title Not Available"}
                  </Typography>

                  <Box display="flex" gap={2} mb={1} color="text.secondary">
                    {result.movie.release_date && <span>({result.movie.release_date.substring(0,4)})</span>}
                    {result.movie.vote_average && <span>★ {result.movie.vote_average}/10</span>}
                    {result.movie.runtime && <span>{result.movie.runtime} mins</span>}
                  </Box>

                  {result.movie.overview && <Typography mb={1}>{result.movie.overview}</Typography>}
                  {result.summary && <Typography>Why you might like it: {result.summary}</Typography>}

                  {/* SAVE CHECKBOX */}
                  <Box display="flex" alignItems="center" gap={1} mt={2}>
                    <RecommendationCheckBox
                      checked={saved}
                      onChange={(isChecked) => {
                        setSaved(isChecked);
                        if (isChecked) saveMovieToLocalStorage(result.movie);
                      }}
                    />
                    <Typography>Save this movie</Typography>
                  </Box>

                </Paper>
              </Box>
            )}

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                onClick={() => {
                  setResult(null);
                  setStep(0);
                  setAnswers({});
                  setSaved(false);
                }}
              >
                Try Again
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
    );
  }

  // ----------------------------
  // QUESTION SCREEN
  // ----------------------------
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" sx={{ marginTop: 4 }}>
        <Paper sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Question {step + 1} of {QUESTIONS.length}
          </Typography>

          <Typography variant="subtitle1" gutterBottom>{q.text}</Typography>

          {q.type === "choice" && (
            <RadioGroup
              value={answers[q.id] || ""}
              onChange={(e) => updateAnswer(q.id, e.target.value)}
            >
              {q.options.map(opt => (
                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
              ))}
            </RadioGroup>
          )}

          {q.type === "multiChoice" && (
            <FormGroup row>
              {q.options.map(opt => (
                <FormControlLabel
                  key={opt}
                  control={
                    <Checkbox
                      checked={(answers[q.id] || []).includes(opt)}
                      onChange={() => updateAnswer(q.id, opt, true)}
                    />
                  }
                  label={opt}
                />
              ))}
            </FormGroup>
          )}

          {q.type === "text" && (
            <TextField
              fullWidth
              variant="outlined"
              value={answers[q.id] || ""}
              placeholder={q.placeholder || ""}
              onChange={(e) => updateAnswer(q.id, e.target.value)}
              sx={{ marginY: 2 }}
            />
          )}

          {error && <Typography color="error" mt={2}>{error}</Typography>}

          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button
              variant="contained"
              disabled={step === 0 || loading}
              onClick={() => setStep(s => Math.max(0, s - 1))}
            >
              Back
            </Button>

            {step < QUESTIONS.length - 1 ? (
              <Button
                variant="contained"
                disabled={!canProceed() || loading}
                onClick={() => setStep(s => Math.min(QUESTIONS.length - 1, s + 1))}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={!canProceed() || loading}
                onClick={handleSubmit}
              >
                {loading ? <CircularProgress size={20} /> : "Submit"}
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
}
