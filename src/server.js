const { exec } = require('child_process');
const app  = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅  Server running → http://localhost:${PORT}`);

  // Auto-open browser (Windows / Mac / Linux)
  const url = `http://localhost:${PORT}`;
  const cmd = process.platform === 'win32' ? `start ${url}`
            : process.platform === 'darwin' ? `open ${url}`
            : `xdg-open ${url}`;

  exec(cmd);
});