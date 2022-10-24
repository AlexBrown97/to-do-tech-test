import React, { MouseEvent, useState } from "react";

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

export type Task = {
  name: string;
};

export type AppProps = {
  initialTasks: Task[];
  onStateChange: (tasks: Task[]) => void;
};

const App = ({ initialTasks = [], onStateChange }: AppProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    onStateChange?.(updatedTasks);

    setNewTask("");
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateTasks([...tasks, { name: newTask }]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleDeleteItem = (index: number) => (event: MouseEvent) => {
    event.preventDefault();
    const taskList = [...tasks];
    taskList.splice(index, 1);
    updateTasks(taskList);
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 20, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            TODO
          </Typography>
          <Stack spacing={2}>
            <form onSubmit={handleSubmit}>
              <TextField label="Name" value={newTask} onChange={handleChange} />
              <Button type="submit" color="primary" startIcon={<AddIcon />}>
                Add
              </Button>
            </form>
            <Divider />
            <List component="nav">
              {tasks.map((task, i) => (
                <ListItem key={`${task.name}-${i}`}>
                  <ListItemText primary={task.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      type="button"
                      aria-label="Delete"
                      onClick={handleDeleteItem(i)}
                    >
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
