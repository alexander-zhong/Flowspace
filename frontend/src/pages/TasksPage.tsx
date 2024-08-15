import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useFetchaiMutation,
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

  const [tasks, setTasks] = useState<Task[]>([]);

  // For queries and mutations
  const { data, error, isLoading, refetch } = useFetchtasksQuery();
  const [updateTasks] = useUpdatetasksMutation();
  const [fetchai] = useFetchaiMutation();

  // For adding tasks
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ _id: "", title: "", subtasks: "" });
  const [textAI, setTextAI] = useState("");

  // Initializes the tasks when rendering component
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error("Something went wrong. Internal server error.");
    } else {
      if (data) {
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
    updateTasksAPI(updatedTasks);
  };

  // Handle adding tasks
  const handleAddedTask = async () => {
    if (newTask.title === "" || newTask.subtasks === "") {
      toast.error("Must enter text to add a task!");
    } else {
      const tasksString = newTask.subtasks.split("\n");

      const subtasksArray = tasksString.map((item) => {
        return { task: item, check: false };
      });

      const updatedTasks = [
        ...tasks,
        {
          title: newTask.title,
          subtasks: subtasksArray,
        },
      ];

      try {
        await updateTasks({ tasks: updatedTasks }).unwrap();
        dispatch(setAuthSliceTasks(updatedTasks));
      } catch (error) {
        console.error("Failed to update tasks:", error);
        toast.error("Internal Server Error");
      }

      await refetch();
      if (error) {
        console.log(error);
        toast.error("Something went wrong. Internal server error.");
      } else {
        if (data) {
          setTasks(data);
        }
      }
      setNewTask({ _id: "", title: "", subtasks: "" });
      setTextAI("");
      setShowAdd(false);
      toast.success("Successfully added task!");
    }
  };

  // Handle AI Generated tasks from backend
  const handleAITask = async () => {
    try {
      if (textAI !== "") {
        const result = await fetchai({
          userPrompt: textAI,
          title: newTask.title,
          taskblob: newTask.subtasks,
        }).unwrap();

        setNewTask({ ...newTask, subtasks: result.tasks });
        setTextAI("");
        toast.success("Successfully Generated");
      } else {
        toast.error("Enter instructions first!");
      }
    } catch (err) {
      toast.error("Internal server error");
    }
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
              <AddItem
                variant="outlined"
                onClick={() => {
                  setShowAdd(!showAdd);
                }}
              >
                Click Here to Add a Task
              </AddItem>
            </Grid>
            {showAdd ? (
              <Grid item key="textadd">
                <Item>
                  <TextField
                    id="outlined-textarea"
                    label="Title"
                    value={newTask.title}
                    placeholder="Title of task"
                    onChange={(e) => {
                      setNewTask({ ...newTask, title: e.target.value });
                    }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="Tasks"
                    value={newTask.subtasks}
                    placeholder={`Every linebreak (return key) creates a new task. Example: \nProject 1\nProject 2\nProject 3`}
                    multiline
                    sx={{ mt: 2, width: 300 }}
                    onChange={(e) => {
                      setNewTask({ ...newTask, subtasks: e.target.value });
                    }}
                  />
                  <TextField
                    id="outlined-textarea"
                    label="AI Instructions"
                    value={textAI}
                    placeholder="AI Generate Task List."
                    sx={{ mt: 2, width: 300, mb: 2 }}
                    onChange={(e) => {
                      setTextAI(e.target.value);
                    }}
                  />
                  <Button sx={{ borderLeft: 5 }} onClick={handleAITask}>
                    Use AI
                  </Button>
                  <Button sx={{ borderRight: 5 }} onClick={handleAddedTask}>
                    Add Task
                  </Button>
                </Item>
              </Grid>
            ) : null}
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
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        width: "100%",
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
