const fs = require('fs');
const path = require('path');

const downloadsDir = path.join(__dirname, 'downloads', 'exported-files');
const now = Date.now();
const hours24 = 24 * 60 * 60 * 1000;

if (!fs.existsSync(downloadsDir)) {
  console.log('Folder does not exist:', downloadsDir);
  process.exit(0);
}

fs.readdir(downloadsDir, (err, files) => {
  if (err) return console.error('Error reading directory:', err);

  files.forEach(file => {
    const filePath = path.join(downloadsDir, file);
    fs.stat(filePath, (err, stats) => {
      if (err) return console.error('Error getting stats:', err);

      if (now - stats.mtimeMs > hours24) {
        fs.unlink(filePath, err => {
          if (err) console.error('Error deleting file:', filePath, err);
          else console.log('Deleted old file:', filePath);
        });
      }
    });
  });
});
