import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useFetchtasksQuery,
  useUpdatetasksMutation,
} from "../slices/usersApiSlice";
import { Task, setAuthSliceTasks } from "../slices/authSlice";

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

  const [tasks, setTasks] = useState<Task[]>([]);

  // For queries and mutations
  const { data, error, isLoading } = useFetchtasksQuery();
  const [updateTasks] = useUpdatetasksMutation();

  // Initializes the tasks when rendering component
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error("Something went wrong. Internal server error.");
    } else {
      if (data) {
        console.log(data);
        setTasks(data);
      }
    }
  }, [data]);

  // Update tasks API
  const updateTasksAPI = async (newList: Task[]) => {
    try {
      await updateTasks({ tasks: newList }).unwrap();
      dispatch(setAuthSliceTasks(newList));
    } catch (error) {
      console.error("Failed to update tasks:", error);
      toast.error("Internal Server Error");
    }
  };

  // Deleting the complete task from api
  const handleCompleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task._id !== id);
    setTasks(updatedTasks);
    console.log(updatedTasks);

    updateTasksAPI(updatedTasks);
  };

  return (
    <>
      {isLoading ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25vh",
            transform: "scale(2)",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
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
            <Grid item key="add">
              <AddItem variant="outlined">Hi</AddItem>
            </Grid>
            {tasks.map((task) => (
              <Grid item key={task._id}>
                <Item>
                  <Typography>{task.title}</Typography>
                  {task.subtasks.map((subtask) => (
                    <Box
                      key={subtask.task}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 1,
                      }}
                    >
                      <Checkbox
                        checked={subtask.check}
                        onChange={() => {
                          const updatedTasks = tasks.map((item) => {
                            if (item._id === task._id) {
                              return {
                                ...item,
                                subtasks: item.subtasks.map((subitem) => {
                                  if (subitem._id === subtask._id) {
                                    return {
                                      ...subitem,
                                      check: !subitem.check,
                                    };
                                  }
                                  return subitem;
                                }),
                              };
                            }
                            return item;
                          });

                          // Update the state with the new tasks array
                          setTasks(updatedTasks);

                          // Call the API to update the tasks
                          updateTasksAPI(updatedTasks);
                        }}
                      />
                      <Typography variant="body1">{subtask.task}</Typography>
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCompleteTask(task._id)}
                  >
                    Complete Task
                  </Button>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default TasksPage;
