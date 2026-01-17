import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Stack,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { logout } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchProfile();
  }, []);

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Fetch tasks failed");
    }
  };

  // 🔹 Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/profile");
      setProfile(res.data);
    } catch (error) {
      console.error("Profile fetch failed");
    }
  };

  // ➕ Create task
  const handleCreateTask = async () => {
    if (!title.trim()) return;

    setLoading(true);
    try {
      const res = await API.post("/tasks", { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
    } catch (error) {
      console.error("Create task failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle task
  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, {
        completed: !completed,
      });

      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.error("Update task failed");
    }
  };

  // 🗑️ Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete task failed");
    }
  };

  // 🔍 Search + Filter logic
  const filteredTasks = tasks.filter((task) => {
    const matchSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") return matchSearch && task.completed;
    if (filter === "pending") return matchSearch && !task.completed;

    return matchSearch;
  });

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      {/* 👤 Profile Section */}
      {profile && (
        <Box
          mb={4}
          p={2}
          sx={{
            backgroundColor: "#f9fafb",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">
            Welcome, {profile.name}
          </Typography>
          <Typography color="text.secondary">
            {profile.email}
          </Typography>
        </Box>
      )}

      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Task Dashboard
        </Typography>

        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={logout}
        >
          Logout
        </Button>
      </Box>

      {/* Add Task */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          label="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          onClick={handleCreateTask}
          disabled={loading}
        >
          Add
        </Button>
      </Box>

      {/* Search & Filter */}
      <Box display="flex" gap={2} mb={3}>
        <TextField
          fullWidth
          label="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Task List */}
      <Stack spacing={2}>
        {filteredTasks.map((task) => (
          <Card
            key={task._id}
            sx={{
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box display="flex" alignItems="center">
                <Checkbox
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task._id, task.completed)
                  }
                />

                <Typography
                  sx={{
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                    color: task.completed
                      ? "text.disabled"
                      : "text.primary",
                  }}
                >
                  {task.title}
                </Typography>
              </Box>

              <IconButton
                color="error"
                onClick={() => deleteTask(task._id)}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}

        {filteredTasks.length === 0 && (
          <Typography align="center" color="text.secondary">
            No tasks found
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default Dashboard;
