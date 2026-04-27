// Category options
const categoryOptions = {
    income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Other'],
    expense: ['Food', 'Travel', 'Shopping', 'Entertainment', 'Utilities', 'Healthcare', 'Education', 'Other']
};

let comparisonChart = null;
let categoryChart = null;
let allTransactions = [];
let dashboardData = {};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions();
    loadDashboard();
    populateFilterCategories();
});

// Update category options when type changes
function updateCategoryOptions() {
    const type = document.getElementById('type').value;
    const categorySelect = document.getElementById('category');
    const categories = categoryOptions[type] || ['Other'];
    
    categorySelect.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

// Add transaction
document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const payment_mode = document.getElementById('payment_mode').value;

    fetch('/add_transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, description, amount, category, payment_mode })
    }).then(r => r.json()).then(d => {
        if (d.success) {
            document.getElementById('transaction-form').reset();
            updateCategoryOptions();
            loadTransactions();
            loadDashboard();
        }
    });
});

// Load transactions
function loadTransactions() {
    fetch('/get_transactions').then(r => r.json()).then(d => {
        allTransactions = d.transactions;
        displayTransactions(d.transactions);
        populateFilterCategories();
    });
}

// Load dashboard data
function loadDashboard() {
    fetch('/dashboard').then(r => r.json()).then(data => {
        dashboardData = data;
        updateDashboard(data);
    });
}

// Update dashboard with data
function updateDashboard(data) {
    // Summary cards
    document.getElementById('total-spent').textContent = `₹${data.this_month_spent.toFixed(2)}`;
    document.getElementById('budget-remaining').textContent = `₹${Math.max(0, data.budget_remaining).toFixed(2)}`;
    document.getElementById('budget-percent').textContent = `${Math.round((data.budget_remaining / data.budget) * 100)}% of budget`;
    document.getElementById('savings').textContent = `₹${Math.max(0, data.savings).toFixed(2)}`;
    document.getElementById('savings-rate-text').textContent = `${Math.round(data.savings_rate)}% Saved`;

    // Weekly vs Monthly
    document.getElementById('this-week').textContent = `₹${data.this_week_spent.toFixed(2)}`;
    document.getElementById('last-week').textContent = `₹${data.last_week_spent.toFixed(2)}`;
    document.getElementById('this-month').textContent = `₹${data.this_month_spent.toFixed(2)}`;
    
    const changePercent = data.week_change_percent.toFixed(0);
    const changeText = data.week_comparison === 'increased' ? `+${changePercent}%` : `-${changePercent}%`;
    const changeColor = data.week_comparison === 'increased' ? '#ff5252' : '#00c853';
    document.getElementById('week-change').textContent = changeText;
    document.getElementById('week-change').style.color = changeColor;

    // Top category
    document.getElementById('top-category-name').textContent = data.top_category || 'No spending';
    document.getElementById('top-category-amount').textContent = `₹${data.top_category_amount.toFixed(2)} (${Math.round(data.top_category_percent)}%)`;

    // Savings rate
    updateSavingsRate(data.savings_rate);

    // Insights
    updateInsights(data.insights);

    // Charts
    updateComparisonChart(data);
    updateCategoryChart(data.category_breakdown);
}

// Update insights
function updateInsights(insights) {
    const insightsList = document.getElementById('insights-list');
    if (insights.length === 0) {
        insightsList.innerHTML = '<p style="color: #999;">No insights yet. Keep tracking your expenses!</p>';
        return;
    }
    insightsList.innerHTML = insights.map(insight => `<div class="insight-item">${insight}</div>`).join('');
}

// Update savings rate circular progress
function updateSavingsRate(rate) {
    const percentage = Math.min(100, Math.max(0, rate));
    document.getElementById('savings-percent').textContent = `${Math.round(percentage)}%`;
    
    // Calculate stroke dashoffset (circumference is 282.7 for radius 45)
    const circumference = 282.7;
    const offset = circumference - (percentage / 100) * circumference;
    document.getElementById('savingsProgressCircle').style.strokeDashoffset = offset;
    
    // Set color based on savings rate
    let statusText = '';
    let statusColor = '#ff5252';
    if (percentage < 10) {
        statusColor = '#ff5252';
        statusText = '🔴 Poor: Less than 10% saved. Try to cut expenses!';
    } else if (percentage < 30) {
        statusColor = '#ffc107';
        statusText = '🟡 Average: 10-30% saved. Good progress!';
    } else {
        statusColor = '#00c853';
        statusText = '🟢 Excellent: 30%+ saved. Great job!';
    }
    
    document.getElementById('savingsProgressCircle').style.stroke = statusColor;
    document.getElementById('savings-status-text').textContent = statusText;
}

// Update comparison chart
function updateComparisonChart(data) {
    const ctx = document.getElementById('comparisonChart').getContext('2d');
    
    if (comparisonChart) {
        comparisonChart.destroy();
    }
    
    comparisonChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['This Week', 'Last Week', 'This Month', 'Last Month'],
            datasets: [{
                label: 'Spending (₹)',
                data: [
                    data.this_week_spent,
                    data.last_week_spent,
                    data.this_month_spent,
                    data.last_month_spent
                ],
                backgroundColor: [
                    '#667eea',
                    '#764ba2',
                    '#ff6b9d',
                    '#a8e6cf'
                ],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Update category chart
function updateCategoryChart(categoryBreakdown) {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const categories = Object.keys(categoryBreakdown);
    const amounts = Object.values(categoryBreakdown);
    const colors = generateColors(categories.length);
    
    if (categoryChart) {
        categoryChart.destroy();
    }
    
    categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: amounts,
                backgroundColor: colors,
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Generate colors
function generateColors(count) {
    const colors = [
        '#667eea', '#764ba2', '#f093fb', '#4facfe',
        '#00f2fe', '#43e97b', '#fa709a', '#fee140',
        '#30b0fe', '#ec008c', '#ff6b9d', '#a8e6cf'
    ];
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(colors[i % colors.length]);
    }
    return result;
}

// Display transactions
function displayTransactions(transactions) {
    const listDiv = document.getElementById('transactions-list');
    if (transactions.length === 0) {
        listDiv.innerHTML = '<p class="no-data">No transactions yet. Add one above!</p>';
        return;
    }
    
    listDiv.innerHTML = '';
    transactions.slice().reverse().forEach(trans => {
        const transDiv = document.createElement('div');
        transDiv.className = `transaction-item ${trans.type}`;
        const categoryText = trans.category ? `<span class="transaction-category">${trans.category}</span>` : '';
        transDiv.innerHTML = `
            <div class="transaction-details">
                <h4>${trans.description}</h4>
                <p>${trans.date}</p>
                <p style="margin-top: 5px;">${trans.payment_mode} ${categoryText}</p>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
                <span class="transaction-amount ${trans.type}">${trans.type === 'income' ? '+' : '-'}₹${trans.amount.toFixed(2)}</span>
                <div class="transaction-actions">
                    <button class="btn-edit" onclick="openEditModal(${trans.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteTransaction(${trans.id})">Delete</button>
                </div>
            </div>
        `;
        listDiv.appendChild(transDiv);
    });
}

// Open edit modal
function openEditModal(id) {
    const trans = allTransactions.find(t => t.id === id);
    if (!trans) return;
    
    const type = trans.type;
    const categories = categoryOptions[type] || ['Other'];
    
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-description').value = trans.description;
    document.getElementById('edit-amount').value = trans.amount;
    document.getElementById('edit-payment_mode').value = trans.payment_mode;
    
    const categorySelect = document.getElementById('edit-category');
    categorySelect.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        if (cat === trans.category) option.selected = true;
        categorySelect.appendChild(option);
    });
    
    document.getElementById('editModal').style.display = 'block';
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Edit form submit
document.getElementById('edit-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('edit-id').value);
    const description = document.getElementById('edit-description').value;
    const amount = document.getElementById('edit-amount').value;
    const category = document.getElementById('edit-category').value;
    const payment_mode = document.getElementById('edit-payment_mode').value;
    
    fetch(`/update_transaction/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount, category, payment_mode })
    }).then(r => r.json()).then(d => {
        if (d.success) {
            closeEditModal();
            loadTransactions();
            loadDashboard();
        }
    });
});

// Delete transaction
function deleteTransaction(id) {
    if (confirm('Are you sure you want to delete this transaction?')) {
        fetch(`/delete_transaction/${id}`, {
            method: 'DELETE'
        }).then(r => r.json()).then(d => {
            if (d.success) {
                loadTransactions();
                loadDashboard();
            }
        });
    }
}

// Populate filter categories
function populateFilterCategories() {
    const allCategories = new Set();
    allTransactions.forEach(t => {
        if (t.category) allCategories.add(t.category);
    });
    
    const filterSelect = document.getElementById('filter-category');
    filterSelect.innerHTML = '<option value="">All Categories</option>';
    Array.from(allCategories).sort().forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filterSelect.appendChild(option);
    });
}

// Apply filters
function applyFilters() {
    const category = document.getElementById('filter-category').value;
    const startDate = document.getElementById('filter-start-date').value;
    const endDate = document.getElementById('filter-end-date').value;
    
    let filtered = allTransactions.filter(t => t.type === 'expense');
    
    if (category) {
        filtered = filtered.filter(t => t.category === category);
    }
    
    if (startDate) {
        const start = new Date(startDate).getTime();
        filtered = filtered.filter(t => new Date(t.date).getTime() >= start);
    }
    
    if (endDate) {
        const end = new Date(endDate).getTime();
        filtered = filtered.filter(t => new Date(t.date).getTime() <= end);
    }
    
    displayTransactions(filtered);
}

// Reset filters
function resetFilters() {
    document.getElementById('filter-category').value = '';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';
    displayTransactions(allTransactions);
}

// Show detailed view
function showDetailedView(cardType) {
    const modal = document.getElementById('detailModal');
    const title = document.getElementById('detailTitle');
    const content = document.getElementById('detailContent');
    
    let html = '';
    
    if (cardType === 'total-spent') {
        title.textContent = '💸 Total Spending Details';
        html = `
            <div class="detail-section">
                <h3>This Month Breakdown</h3>
                <div class="detail-stats">
                    <div class="detail-stat">
                        <div class="detail-stat-value">₹${dashboardData.this_month_spent.toFixed(2)}</div>
                        <div class="detail-stat-label">Total Spent</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${allTransactions.filter(t => t.type === 'expense').length}</div>
                        <div class="detail-stat-label">Transactions</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">₹${(dashboardData.this_month_spent / (allTransactions.filter(t => t.type === 'expense').length || 1)).toFixed(2)}</div>
                        <div class="detail-stat-label">Avg per Transaction</div>
                    </div>
                </div>
            </div>
            <div class="detail-section">
                <h3>Category Breakdown</h3>
                <div class="detail-stats">
                    ${Object.entries(dashboardData.category_breakdown).map(([cat, amount]) => `
                        <div class="detail-stat">
                            <div class="detail-stat-value">₹${amount.toFixed(2)}</div>
                            <div class="detail-stat-label">${cat}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (cardType === 'budget-remaining') {
        title.textContent = '🎯 Budget Status';
        const percentUsed = (dashboardData.this_month_spent / dashboardData.budget) * 100;
        html = `
            <div class="detail-section">
                <h3>Budget Information</h3>
                <div class="detail-stats">
                    <div class="detail-stat">
                        <div class="detail-stat-value">₹${dashboardData.budget.toFixed(2)}</div>
                        <div class="detail-stat-label">Total Budget</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">₹${dashboardData.this_month_spent.toFixed(2)}</div>
                        <div class="detail-stat-label">Used</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">₹${Math.max(0, dashboardData.budget_remaining).toFixed(2)}</div>
                        <div class="detail-stat-label">Remaining</div>
                    </div>
                </div>
            </div>
            <div class="detail-section">
                <h3>Usage Analysis</h3>
                <p style="margin-bottom: 10px;"><strong>${Math.round(percentUsed)}%</strong> of budget used</p>
                <div style="background: #e0e0e0; height: 20px; border-radius: 10px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #667eea, #764ba2); height: 100%; width: ${Math.min(100, percentUsed)}%;"></div>
                </div>
            </div>
        `;
    } else if (cardType === 'savings') {
        title.textContent = '🏦 Savings Overview';
        html = `
            <div class="detail-section">
                <h3>Savings Analysis</h3>
                <div class="detail-stats">
                    <div class="detail-stat">
                        <div class="detail-stat-value">₹${dashboardData.savings.toFixed(2)}</div>
                        <div class="detail-stat-label">Total Saved</div>
                    </div>
                    <div class="detail-stat">
                        <div class="detail-stat-value">${Math.round(dashboardData.savings_rate)}%</div>
                        <div class="detail-stat-label">Savings Rate</div>
                    </div>
                </div>
            </div>
            <div class="detail-section">
                <h3>Formula</h3>
                <p>Savings Rate = (Income - Expenses) / Income × 100</p>
                <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
                    (₹${(dashboardData.savings + dashboardData.this_month_spent).toFixed(2)} - ₹${dashboardData.this_month_spent.toFixed(2)}) / ₹${(dashboardData.savings + dashboardData.this_month_spent).toFixed(2)} × 100
                </p>
            </div>
            <div class="detail-section">
                <h3>Recommendation</h3>
                <p>${dashboardData.savings_rate >= 30 ? '🟢 Excellent! You\'re saving more than 30%.' : dashboardData.savings_rate >= 10 ? '🟡 Good progress! Try to increase your savings rate.' : '🔴 Consider reducing expenses to save more.'}</p>
            </div>
        `;
    }
    
    content.innerHTML = html;
    modal.style.display = 'block';
}

// Close detailed view
function closeDetailedView() {
    document.getElementById('detailModal').style.display = 'none';
}

// Close modals on outside click
window.onclick = function(event) {
    let editModal = document.getElementById('editModal');
    let detailModal = document.getElementById('detailModal');
    
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
    if (event.target === detailModal) {
        detailModal.style.display = 'none';
    }
};
