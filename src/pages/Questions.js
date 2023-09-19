import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useCustomAxios from "../hooks/useCustomAxios"; 
import { updateScore } from "../redux/actions"; 

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const CustomQuestions = () => {
  const {
    selectedCategory,
    selectedDifficulty,
    selectedType,
    numberOfQuestions,
    userScore, 
  } = useSelector((state) => state);
  const navigationHistory = useHistory(); 
  const reduxDispatch = useDispatch();

  let apiUrl = `/api.php?amount=${numberOfQuestions}`;
  if (selectedCategory) {
    apiUrl = apiUrl.concat(`&category=${selectedCategory}`);
  }
  if (selectedDifficulty) {
    apiUrl = apiUrl.concat(`&difficulty=${selectedDifficulty}`);
  }
  if (selectedType) {
    apiUrl = apiUrl.concat(`&type=${selectedType}`);
  }

  const { responseData, isLoading } = useCustomAxios({ apiUrl });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [answerOptions, setAnswerOptions] = useState([]); 

  useEffect(() => {
    if (responseData?.results.length) {
      const currentQuestion = responseData.results[currentQuestionIndex];
      let answers = [...currentQuestion.incorrect_answers];
      answers.splice(
        getRandomInt(currentQuestion.incorrect_answers.length),
        0,
        currentQuestion.correct_answer
      );
      setAnswerOptions(answers);
    }
  }, [responseData, currentQuestionIndex]);

  if (isLoading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  const handleAnswerClick = (e) => {
    const currentQuestion = responseData.results[currentQuestionIndex];
    if (e.target.textContent === currentQuestion.correct_answer) {
      reduxDispatch(updateScore(userScore + 1)); 
    }

    if (currentQuestionIndex + 1 < responseData.results.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigationHistory.push("/score");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Question {currentQuestionIndex + 1}</Typography>
      <Typography mt={5}>
        {decode(responseData.results[currentQuestionIndex].question)}
      </Typography>
      {answerOptions.map((option, id) => (
        <Box mt={2} key={id}>
          <Button onClick={handleAnswerClick} variant="contained">
            {decode(option)}
          </Button>
        </Box>
      ))}
      <Box mt={5}>
        Score: {userScore} / {responseData.results.length}
      </Box>
    </Box>
  );
};

export default CustomQuestions;
