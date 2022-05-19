import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";

import "./App.css";

const App = ({ initialTasks, initialNewTask, onState }) => {
const App = ({ initialTasks = [], initialNewTask, onState }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState(initialNewTask);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTasks = [...tasks, { name: newTask }];
    setTasks(newTasks);
    setNewTask("");
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const deleteItem = (index) => (event) => {
    const taskList = [...tasks];
    taskList.splice(index, 1);
    setTasks(taskList);
  };

  useEffect(() => {
    onState?.(tasks, newTask);
  }, [tasks, newTask]);

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            TODO
          </Typography>
          <Stack spacing={2}>
            <form onSubmit={handleSubmit} id="addtask">
              <TextField
                id="newTask"
                label="Name"
                value={newTask}
                onChange={handleChange}
              />
              <Button
                type="submit"
                aria-label="Add"
                color="primary"
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </form>
            <Divider />
            <List component="nav">
              {tasks.map((task, i) => (
                <ListItem key={`${task.name}-${i}`}>
                  <ListItemText primary={task.name} />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={deleteItem(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default App;
