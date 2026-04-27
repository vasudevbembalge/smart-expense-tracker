# 🧪 Smart Expense Tracker - Testing Guide

## Quick Start for Testing

### Step 1: Run the Application
```bash
cd "c:\Users\SRUJANA SREE\Downloads\devops.py (2)\devops.py\smart-expense-tracker"
python app.py
```

Expected output:
```
 * Running on http://127.0.0.1:5000
 * Press CTRL+C to quit
```

### Step 2: Open in Browser
Navigate to: **http://localhost:5000**

---

## 📝 Sample Data to Test All Features

### Test Case 1: Basic Expense Tracking

#### Step A: Add Income
1. Select **Type**: Income
2. Select **Category**: Salary
3. Enter **Description**: Monthly Salary
4. Select **Payment Mode**: Bank Transfer
5. Enter **Amount**: 50000
6. Click **Add Transaction**

Expected Result: 
- ✓ Transaction appears in Recent Transactions
- ✓ Dashboard updates showing Savings calculation

#### Step B: Add Expenses
Repeat the following 5 times with different data:

**Expense 1: Food**
- Type: Expense
- Description: Breakfast
- Category: Food
- Payment Mode: Cash
- Amount: 250

**Expense 2: Food**
- Type: Expense
- Description: Lunch
- Category: Food
- Payment Mode: Card
- Amount: 450

**Expense 3: Travel**
- Type: Expense
- Description: Uber to office
- Category: Travel
- Payment Mode: UPI
- Amount: 200

**Expense 4: Shopping**
- Type: Expense
- Description: Groceries
- Category: Shopping
- Payment Mode: Card
- Amount: 800

**Expense 5: Entertainment**
- Type: Expense
- Description: Movie tickets
- Category: Entertainment
- Payment Mode: Cash
- Amount: 300

Expected Results:
- ✓ Total Spent: ₹2,000
- ✓ Budget Remaining: ₹48,000 (96% of budget)
- ✓ Savings: ₹48,000 (96% savings rate)

---

### Test Case 2: Dashboard Features

#### 🎯 Summary Cards (Test Drill-Down)

**Test Total Spent Card:**
1. Click on **"Total Spent"** card
2. Modal opens showing:
   - ✓ Total Spent: ₹2,000
   - ✓ Total Transactions: 5
   - ✓ Average per Transaction: ₹400
   - ✓ Category Breakdown (Food: ₹700, etc.)

**Test Budget Card:**
1. Click on **"Budget Remaining"** card
2. Modal shows:
   - ✓ Total Budget: ₹50,000
   - ✓ Amount Used: ₹2,000
   - ✓ Amount Remaining: ₹48,000
   - ✓ Usage Progress Bar: 4% used

**Test Savings Card:**
1. Click on **"Savings"** card
2. Modal displays:
   - ✓ Total Saved: ₹48,000
   - ✓ Savings Rate: 96%
   - ✓ Formula explanation
   - ✓ 🟢 Green status: "Excellent! You're saving more than 30%"

---

### Test Case 3: Charts & Visualizations

#### 📊 Weekly vs Monthly Comparison
Expected behavior:
- ✓ Bar chart shows spending across 4 periods
- ✓ This Week: ₹2,000 (all expenses added today)
- ✓ Last Week: ₹0 (no expenses)
- ✓ Shows: "You spent 100% more than last week" insight

#### 🍕 Top Spending Category
Expected behavior:
- ✓ Doughnut chart displays category breakdown
- ✓ Food category highlighted with highest amount
- ✓ Shows: "Food expenses are 35% of your total spending"
- ✓ Pie chart shows proportions: Food (35%), Shopping (40%), Travel (10%), Entertainment (15%)

#### 💰 Savings Rate Progress
Expected behavior:
- ✓ Circular progress bar shows 96%
- ✓ Green color (> 30%)
- ✓ Status: "🟢 Excellent: 30%+ saved. Great job!"

---

### Test Case 4: Smart Insights

Expected insights displayed:
1. ✓ "🍔 Shopping expenses are 40% of your total spending" (if shopping is high)
2. ✓ "⚠️ You're spending 100% more than last week" (week comparison)
3. ✓ May show weekend spending if applicable

---

### Test Case 5: Edit Transaction

#### Test Edit Functionality
1. Locate any transaction in "Recent Transactions"
2. Click the **"Edit"** button
3. Modal opens with pre-filled data:
   - ✓ Description field shows current value
   - ✓ Category dropdown shows selected category
   - ✓ Amount field shows current amount
   - ✓ Payment Mode shows selected mode

#### Modify and Save
1. Change Amount from 250 to 300
2. Click **"Save Changes"**
3. Expected results:
   - ✓ Modal closes
   - ✓ Transaction in list updates
   - ✓ Dashboard recalculates:
     - Total Spent: ₹2,050 (increased by 50)
     - Savings: ₹47,950 (decreased by 50)
     - Savings Rate: 95.9% (slight decrease)

---

### Test Case 6: Filtering Expenses

#### Test Category Filter
1. Click **Filter by Category** dropdown
2. Select **"Food"**
3. Click **"Apply Filters"**
4. Expected results:
   - ✓ Only Food expenses appear:
     - Breakfast ₹250
     - Lunch ₹450
   - ✓ Total visible: ₹700

#### Test Date Range Filter
1. Set **Start Date**: Today
2. Set **End Date**: Today
3. Click **"Apply Filters"**
4. Expected results:
   - ✓ Shows all transactions from today

#### Test Reset
1. Click **"Reset"**
2. Expected results:
   - ✓ All filters cleared
   - ✓ All transactions displayed again

---

### Test Case 7: Delete Transaction (Optional)

1. Click **"Delete"** button on any transaction
2. Confirmation popup appears
3. Click **"OK"**
4. Expected results:
   - ✓ Transaction removed from list
   - ✓ Dashboard recalculates totals

---

## 🔍 Features Verification Checklist

### Backend APIs
- [ ] `GET /dashboard` - Returns dashboard data
- [ ] `PUT /update_transaction/<id>` - Updates transaction
- [ ] `DELETE /delete_transaction/<id>` - Deletes transaction
- [ ] `GET /expenses` - Filters expenses

### Frontend UI
- [ ] Summary cards appear and are clickable
- [ ] Charts render correctly (bar & doughnut)
- [ ] Circular progress bar animates
- [ ] Modals open/close smoothly
- [ ] Edit modal pre-fills data
- [ ] Filters work correctly
- [ ] Insights display dynamically

### Calculations
- [ ] Savings Rate formula: (Income - Expenses) / Income × 100
- [ ] Budget calculations correct
- [ ] Category percentages accurate
- [ ] Week-over-week comparison working

---

## 🐛 Troubleshooting

### Issue: Charts not showing
**Solution**: 
- Check browser console (F12) for errors
- Verify Chart.js loaded from CDN
- Clear browser cache

### Issue: Dashboard not updating after edit
**Solution**:
- Check network tab in DevTools
- Verify PUT endpoint returns success
- Reload page to refresh

### Issue: Category filter dropdown empty
**Solution**:
- Add at least one expense first
- Categories populate from transactions
- Reset filters if stuck

### Issue: Modal not closing
**Solution**:
- Click the X button (close)
- Click outside the modal
- Press ESC key

---

## 📊 Expected Dashboard State After Test Data

| Metric | Value |
|--------|-------|
| Total Income | ₹50,000 |
| Total Spent | ₹2,000 |
| Budget | ₹50,000 |
| Budget Remaining | ₹48,000 |
| Savings | ₹48,000 |
| Savings Rate | 96% |
| Status | 🟢 Excellent |

### Category Breakdown
| Category | Amount | % |
|----------|--------|---|
| Food | ₹700 | 35% |
| Shopping | ₹800 | 40% |
| Travel | ₹200 | 10% |
| Entertainment | ₹300 | 15% |

---

## 🎬 Demo Video Script

If you want to record a demo:

1. **Open app** → Show clean dashboard
2. **Add income** → ₹50,000 salary
3. **Add 5 expenses** → Different categories
4. **Show charts updating** → Bar chart, doughnut chart
5. **Click summary cards** → Show drill-down modals
6. **Edit a transaction** → Change amount
7. **Show insights** → Dynamic insights appearing
8. **Apply filter** → Show filtering in action
9. **Show savings tracker** → Circular progress bar

---

**Ready to Test?** Run `python app.py` and visit `http://localhost:5000`

Happy Testing! 🎉
