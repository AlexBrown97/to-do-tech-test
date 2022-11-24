import React, { MouseEvent, useState } from "react";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
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
import styled from 'styled-components'
import sortBy from 'lodash/sortBy'

import "./App.css";

const StyledCard = styled.div`
  text-align: center;
  position:absolute;
  margin: auto;
  background-color: lightgray ;
  min-width: 275;
`

export type Task = {
  name: string;
  points: number;
};

export type AppProps = {
  initialTasks: Task[];
  onStateChange: (tasks: Task[]) => void;
};

const App = ({ initialTasks = [], onStateChange }: AppProps) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [pointValue, setPointValue] = useState(0);

  const updateTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    onStateChange?.(updatedTasks);

    setNewTask("");
    setPointValue(0);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    updateTasks([...tasks, { name: newTask, points: pointValue }]);
    sortBy(tasks, [pointValue])
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "name") {
      setNewTask(event.target.value);
    }
    else if(event.target.name === "points"){
      setPointValue(Number(event.target.value));
    }
  };

  const handleDeleteItem = (index: number) => (event: MouseEvent) => {
    event.preventDefault();
    const taskList = [...tasks];
    taskList.splice(index, 1);
    updateTasks(taskList);
  };

  return (
    <Container maxWidth="sm" >
      <StyledCard>
        <CardContent>
          <Typography
            sx={{ fontSize: 30, fontWeight: "bold" }}
            color="text.secondary"
            gutterBottom
          >
            TODO
          </Typography>
          <Stack spacing={2}>
            <form onSubmit={handleSubmit}>
              <TextField label="Name" name="name" value={newTask} onChange={handleChange} />
              <TextField label="Points" name="points" value={pointValue} onChange={handleChange} />
              <Button type="submit" color="primary" startIcon={<AddIcon />}>
                Add
              </Button>
            </form>
            <Divider />
            <List component="nav">
              {tasks.sort((a, b) => b.points > a.points ? 1 : -1)
                .map((task, i) => (
                <ListItem className={task.points >= 10 ? "critical" : "normal"}
                  key={`${task.name}-${i}`}>
                  <ListItemText primary={task.name} />
                  <ListItemText primary={task.points} />
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
      </StyledCard>
    </Container>
  );
};

export default App;
