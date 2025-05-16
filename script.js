// Sample transaction data
const transactions = [
  {
    id: 'TRX-78945',
    client: {
      name: 'Acme Corporation',
      initials: 'AC'
    },
    date: '2025-05-15',
    amount: 24500.00,
    type: 'income',
    status: 'completed'
  },
  {
    id: 'TRX-78946',
    client: {
      name: 'Global Industries',
      initials: 'GI'
    },
    date: '2025-05-14',
    amount: 18750.50,
    type: 'income',
    status: 'completed'
  },
  {
    id: 'TRX-78947',
    client: {
      name: 'Tech Solutions',
      initials: 'TS'
    },
    date: '2025-05-14',
    amount: 9320.75,
    type: 'expense',
    status: 'pending'
  },
  {
    id: 'TRX-78948',
    client: {
      name: 'Marketing Partners',
      initials: 'MP'
    },
    date: '2025-05-13',
    amount: 12450.00,
    type: 'expense',
    status: 'completed'
  },
  {
    id: 'TRX-78949',
    client: {
      name: 'Innovate Labs',
      initials: 'IL'
    },
    date: '2025-05-12',
    amount: 7800.25,
    type: 'income',
    status: 'failed'
  }
];

// DOM Elements
const transactionsTableBody = document.getElementById('transactionsTableBody');
const themeToggle = document.getElementById('themeToggle');
const newTransactionForm = document.getElementById('newTransactionForm');

// Initialize the app
function init() {
  renderTransactions();
  setupEventListeners();
  setCurrentDate();
}

// Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Render transactions in the table
function renderTransactions() {
  transactionsTableBody.innerHTML = '';
  
  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    
    // Determine status class
    let statusClass = '';
    switch(transaction.status) {
      case 'completed':
        statusClass = 'status-completed';
        break;
      case 'pending':
        statusClass = 'status-pending';
        break;
      case 'failed':
        statusClass = 'status-failed';
        break;
    }
    
    // Determine amount class
    const amountClass = transaction.type === 'income' ? 'income' : 'expense';
    const amountPrefix = transaction.type === 'income' ? '+' : '-';
    
    row.innerHTML = `
      <td><span class="transaction-id">${transaction.id}</span></td>
      <td>
        <div class="transaction-client">
          <div class="client-avatar">${transaction.client.initials}</div>
          <span class="client-name">${transaction.client.name}</span>
        </div>
      </td>
      <td><span class="transaction-date">${formatDate(transaction.date)}</span></td>
      <td><span class="transaction-amount ${amountClass}">${amountPrefix} ${formatCurrency(transaction.amount)}</span></td>
      <td><span class="transaction-status ${statusClass}">${transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}</span></td>
      <td>
        <div class="transaction-actions">
          <button class="action-btn" title="View Details">
            <i class="fas fa-eye"></i>
          </button>
          <button class="action-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button class="action-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    `;
    
    transactionsTableBody.appendChild(row);
  });
}

// Set up event listeners
function setupEventListeners() {
  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);
  
  // New transaction form
  if (newTransactionForm) {
    newTransactionForm.addEventListener('submit', handleNewTransaction);
  }
  
  // Category filter buttons
  const dateButtons = document.querySelectorAll('.date-btn');
  dateButtons.forEach(button => {
    button.addEventListener('click', () => {
      dateButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
}

// Toggle dark/light theme
function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  
  // Update icon
  const icon = themeToggle.querySelector('i');
  if (document.body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Handle new transaction form submission
function handleNewTransaction(e) {
  e.preventDefault();
  
  // Get form values
  const type = document.getElementById('transactionType').value;
  const client = document.getElementById('clientName').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('transactionDate').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const paymentMethod = document.getElementById('paymentMethod').value;
  
  // Validate form
  if (!type || !client || !amount || !date || !category || !paymentMethod) {
    alert('Por favor complete todos los campos requeridos.');
    return;
  }
  
  // Create new transaction object
  const newTransaction = {
    id: `TRX-${Math.floor(10000 + Math.random() * 90000)}`,
    client: {
      name: client,
      initials: client.split(' ').map(word => word[0]).join('').toUpperCase()
    },
    date: date,
    amount: amount,
    type: type,
    status: 'completed',
    description: description,
    category: category,
    paymentMethod: paymentMethod
  };
  
  // Add to transactions array
  transactions.unshift(newTransaction);
  
  // Re-render transactions
  renderTransactions();
  
  // Reset form
  newTransactionForm.reset();
  
  // Show success message
  alert('Transacción creada exitosamente.');
}

// Set current date in the transaction form
function setCurrentDate() {
  const dateInput = document.getElementById('transactionDate');
  if (dateInput) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);