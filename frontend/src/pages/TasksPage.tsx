import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: 350,
}));

const AddItem = styled(Button)(({ theme }) => ({
  backgroundColor: "#FFF",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: 350,
}));

const TasksPage = () => {
  // Get the user's tasks to display
  const dispatch = useDispatch();
  const { userTasks } = useSelector((state: RootState) => state.auth);

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          marginTop: 2,
          marginX: "auto",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <AddItem variant="outlined">Hi</AddItem>
          </Grid>
          <Grid item>
            <Item></Item>
          </Grid>
          <Grid item>
            <Item>xs=4</Item>
          </Grid>
          <Grid item>
            <Item>xs=4</Item>
          </Grid>
          <Grid item>
            <Item>xs=4</Item>
          </Grid>
          <Grid item>
            <Item>xs=4</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TasksPage;
