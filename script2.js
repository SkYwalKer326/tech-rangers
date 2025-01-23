let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to render expenses in the table
function renderExpenses() {
    expenseTableBody.innerHTML = ''; // Clear the table
    for (const expense of expenses) {
        const newRow = expenseTableBody.insertRow();

        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            expenses.splice(expenses.indexOf(expense), 1);
            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;
            updateLocalStorage();
            renderExpenses(); // Re-render the expenses
        });

        categoryCell.textContent = expense.category;
        amountCell.textContent = expense.amount;
        dateCell.textContent = expense.date;
        deleteCell.appendChild(deleteBtn);
    }
    totalAmountCell.textContent = totalAmount;
}

// Initial rendering of expenses
renderExpenses();

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, date };
    expenses.push(expense);
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    updateLocalStorage();
    renderExpenses(); // Re-render the expenses

    // Clear input fields
    amountInput.value = '';
    dateInput.value = '';
});