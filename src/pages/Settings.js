import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import CustomSelectField from "../components/CustomSelectField"; 
import CustomTextField from "../components/CustomTextField"; 
import useCustomAxios from "../hooks/useCustomAxios"; 

const CustomSettings = () => {
  const { responseData, errorData, isLoading } = useCustomAxios({
    apiUrl: "/api_category.php", 
  });
  const navigationHistory = useHistory(); 

  if (isLoading) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  if (errorData) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something Went Wrong! 
      </Typography>
    );
  }

  const difficultyOptions = [
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" },
  ];

  const typeOptions = [
    { id: "multiple", name: "Multiple Choice" }, 
    { id: "boolean", name: "True/False" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigationHistory.push("/questions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomSelectField options={responseData.trivia_categories} label="Category" /> 
      <CustomSelectField options={difficultyOptions} label="Difficulty" />
      <CustomSelectField options={typeOptions} label="Type" />
      <CustomTextField /> 
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default CustomSettings;
