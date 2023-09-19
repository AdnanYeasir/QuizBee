import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomSettings from "./pages/CustomSettings"; 
import CustomQuestions from "./pages/CustomQuestions"; 
import CustomFinalScreen from "./pages/CustomFinalScreen"; 
import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";

function CustomApp() { 
  return (
    <Router>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Switch>
            <Route path="/" exact>
              <Typography variant="h2" fontWeight="bold">
                Quiz App
              </Typography>
              <CustomSettings />
            </Route>
            <Route path="/questions">
              <CustomQuestions /> 
            </Route>
            <Route path="/score">
              <CustomFinalScreen />
            </Route>
          </Switch>
        </Box>
      </Container>
    </Router>
  );
}

export default CustomApp; 
