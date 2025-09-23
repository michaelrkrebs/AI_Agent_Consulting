#!/usr/bin/env node

const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// File paths
const dbPath = path.join(__dirname, '..', 'public', 'workflows.sqlite');
const csvPath = path.join(__dirname, '..', '..', 'n8n-workflows', 'catalog', 'flows_with_normalized_titles.csv');

console.log('🚀 Starting database update with normalized titles...');
console.log(`Database: ${dbPath}`);
console.log(`CSV file: ${csvPath}`);

// Parse CSV manually (simple parser for this specific format)
function parseCSV(csvContent) {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = [];
      let currentValue = '';
      let inQuotes = false;

      for (let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(currentValue.trim());
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      values.push(currentValue.trim()); // Last value

      if (values.length === headers.length) {
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        data.push(row);
      }
    }
  }

  return data;
}

try {
  // Check if files exist
  if (!fs.existsSync(dbPath)) {
    console.error('❌ Database file not found:', dbPath);
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found:', csvPath);
    process.exit(1);
  }

  // Read normalized titles from CSV
  console.log('📖 Reading normalized titles from CSV...');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const normalizedData = parseCSV(csvContent);

  console.log(`✅ Found ${normalizedData.length} normalized titles`);

  // Open database
  console.log('🔗 Connecting to database...');
  const db = new Database(dbPath);

  // Check current schema
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('📋 Database tables:', tables.map(t => t.name));

  // Get current workflows
  const workflows = db.prepare('SELECT * FROM workflows LIMIT 5').all();
  console.log('📊 Sample workflow structure:', Object.keys(workflows[0] || {}));

  // Add normalized_title column if it doesn't exist
  try {
    db.prepare('ALTER TABLE workflows ADD COLUMN normalized_title TEXT').run();
    console.log('✅ Added normalized_title column to database');
  } catch (e) {
    if (e.message.includes('duplicate column name')) {
      console.log('ℹ️  normalized_title column already exists');
    } else {
      throw e;
    }
  }

  // Prepare update statement
  const updateStmt = db.prepare(`
    UPDATE workflows
    SET normalized_title = ?
    WHERE id = ? OR name = ?
  `);

  // Update workflows with normalized titles
  console.log('🔄 Updating workflows with normalized titles...');
  let updateCount = 0;
  let notFoundCount = 0;

  const transaction = db.transaction(() => {
    for (const row of normalizedData) {
      const path = row.path;
      const originalTitle = row.original_title;
      const normalizedTitle = row.normalized_title;

      if (normalizedTitle && normalizedTitle !== '') {
        const result = updateStmt.run(normalizedTitle, path, originalTitle);

        if (result.changes > 0) {
          updateCount++;
          if (updateCount % 100 === 0) {
            console.log(`📈 Updated ${updateCount} workflows...`);
          }
        } else {
          notFoundCount++;
          if (notFoundCount <= 5) {
            console.log(`⚠️  No match found for: ${path} / ${originalTitle}`);
          }
        }
      }
    }
  });

  transaction();

  // Verify updates
  const totalWorkflows = db.prepare('SELECT COUNT(*) as count FROM workflows').get().count;
  const updatedWorkflows = db.prepare('SELECT COUNT(*) as count FROM workflows WHERE normalized_title IS NOT NULL AND normalized_title != ?').get('').count;

  console.log('\n📊 UPDATE SUMMARY:');
  console.log(`✅ Total workflows in database: ${totalWorkflows}`);
  console.log(`✅ Workflows updated with normalized titles: ${updateCount}`);
  console.log(`✅ Workflows with normalized titles: ${updatedWorkflows}`);
  console.log(`⚠️  Workflows not found: ${notFoundCount}`);
  console.log(`📈 Success rate: ${((updateCount / normalizedData.length) * 100).toFixed(1)}%`);

  // Show some examples
  console.log('\n🔍 Sample updated workflows:');
  const samples = db.prepare(`
    SELECT name, normalized_title
    FROM workflows
    WHERE normalized_title IS NOT NULL AND normalized_title != ''
    LIMIT 5
  `).all();

  samples.forEach(sample => {
    console.log(`  • "${sample.name}" → "${sample.normalized_title}"`);
  });

  db.close();
  console.log('\n🎉 Database update completed successfully!');

} catch (error) {
  console.error('❌ Error updating database:', error);
  process.exit(1);
}