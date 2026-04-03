const express = require('express');
const app = express();

app.use(express.json());

// ================= ROLE MIDDLEWARE =================
function checkRole(allowedRoles) {
  return (req, res, next) => {
    const role = req.headers.role;

    if (!role) {
      return res.status(403).json({ error: 'Role required' });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  };
}

// ================= TEST =================
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// ================= USER DATA =================
let users = [];

app.post('/users', (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    role,
    active: true
  };

  users.push(newUser);
  res.json(newUser);
});

// ================= FINANCE DATA =================
let records = [];

// CREATE (admin only)
app.post('/records', checkRole(['admin']), (req, res) => {
  const { amount, type, category, date } = req.body;

  if (!amount || !type) {
    return res.status(400).json({ error: 'Amount and type required' });
  }

  if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  const newRecord = {
    id: records.length + 1,
    amount,
    type,
    category,
    date: date || new Date()
  };

  records.push(newRecord);
  res.json(newRecord);
});

// GET (all roles)
app.get('/records', checkRole(['admin', 'analyst', 'viewer']), (req, res) => {
  res.json(records);
});

// GET SINGLE
app.get('/records/:id', checkRole(['admin', 'analyst', 'viewer']), (req, res) => {
  const record = records.find(r => r.id == req.params.id);

  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }

  res.json(record);
});

// UPDATE (admin only)
app.put('/records/:id', checkRole(['admin']), (req, res) => {
  const record = records.find(r => r.id == req.params.id);

  if (!record) {
    return res.status(404).json({ error: 'Record not found' });
  }

  const { amount, type, category } = req.body;

  if (amount) record.amount = amount;
  if (type) record.type = type;
  if (category) record.category = category;

  res.json({ message: 'Updated', record });
});

// DELETE (admin only)
app.delete('/records/:id', checkRole(['admin']), (req, res) => {
  const index = records.findIndex(r => r.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }

  records.splice(index, 1);
  res.json({ message: 'Deleted' });
});

// ================= SUMMARY =================
app.get('/summary', checkRole(['admin', 'analyst']), (req, res) => {
  let totalIncome = 0;
  let totalExpense = 0;

  records.forEach(r => {
    if (r.type === 'income') totalIncome += r.amount;
    else totalExpense += r.amount;
  });

  res.json({
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense
  });
});

// ================= SERVER =================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});