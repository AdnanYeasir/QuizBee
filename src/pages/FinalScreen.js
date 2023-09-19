import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetScore, setQuestionAmount } from "../redux/actions"; 

const CustomFinalScreen = () => {
  const reduxDispatch = useDispatch();
  const navigationHistory = useHistory(); 
  const { finalScore } = useSelector((state) => state); 

  const handleReturnToSettings = () => {
    reduxDispatch(resetScore()); 
    reduxDispatch(setQuestionAmount(50)); 
    navigationHistory.push("/");
  };

  return (
    <Box mt={30}>
      <Typography variant="h3" fontWeight="bold" mb={3}>
        Final Score {finalScore}
      </Typography>
      <Button onClick={handleReturnToSettings} variant="outlined">
        Back to Settings!
      </Button>
    </Box>
  );
};

export default CustomFinalScreen;
