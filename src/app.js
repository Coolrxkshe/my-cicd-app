const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');
const path    = require('path');

const app = express();

// ── Middleware ──────────────────────────────────────
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// ── In-Memory Store ─────────────────────────────────
let tasks = [
  { id: 1, title: 'Set up Azure DevOps pipeline', description: 'Create org, project and connect GitHub repo', priority: 'high',   completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Write Dockerfile',             description: 'Containerize the Node.js application',         priority: 'medium', completed: true,  createdAt: new Date().toISOString() },
  { id: 3, title: 'Configure ACR',                description: 'Push Docker image to Azure Container Registry', priority: 'high',   completed: false, createdAt: new Date().toISOString() },
  { id: 4, title: 'Deploy to App Service',        description: 'Run container on Azure Web App',                priority: 'low',    completed: false, createdAt: new Date().toISOString() },
];
let nextId = 5;

// ── Routes ───────────────────────────────────────────

// Health check (used by pipeline)
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json({ success: true, count: tasks.length, data: tasks });
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
  res.json({ success: true, data: task });
});

// POST create task
app.post('/api/tasks', (req, res) => {
  const { title, description = '', priority = 'medium' } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ success: false, message: 'Title is required' });
  }
  const task = { id: nextId++, title: title.trim(), description, priority, completed: false, createdAt: new Date().toISOString() };
  tasks.push(task);
  res.status(201).json({ success: true, data: task });
});

// PUT update task (toggle complete or edit)
app.put('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Task not found' });
  tasks[idx] = { ...tasks[idx], ...req.body, id: tasks[idx].id };
  res.json({ success: true, data: tasks[idx] });
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Task not found' });
  tasks.splice(idx, 1);
  res.json({ success: true, message: 'Task deleted' });
});

module.exports = app;