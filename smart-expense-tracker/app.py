import flask
from datetime import datetime, timedelta
from collections import defaultdict
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import uuid

app = flask.Flask(__name__)
app.secret_key = 'your-secret-key-change-this-in-production'

# In-memory storage (in production, use a database)
users = {}
transactions = []
balance_data = {'total_income': 0, 'total_expense': 0, 'remaining': 0, 'budget': 50000}

# Login required decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in flask.session:
            return flask.redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

# Authentication Routes

@app.route('/login', methods=['GET', 'POST'])
def login():
    if flask.request.method == 'GET':
        if 'user_id' in flask.session:
            return flask.redirect('/')
        return flask.render_template('login.html')
    
    # Handle POST request for login
    data = flask.request.get_json()
    email = data.get('email', '').lower().strip()
    password = data.get('password', '')
    
    if not email or not password:
        return flask.jsonify({'success': False, 'message': 'Email and password are required'})
    
    if email in users and check_password_hash(users[email]['password'], password):
        flask.session['user_id'] = users[email]['user_id']
        flask.session['email'] = email
        flask.session['name'] = users[email]['name']
        return flask.jsonify({'success': True, 'message': 'Login successful'})
    
    return flask.jsonify({'success': False, 'message': 'Invalid email or password'})

@app.route('/signup', methods=['POST'])
def signup():
    data = flask.request.get_json()
    name = data.get('name', '').strip()
    email = data.get('email', '').lower().strip()
    password = data.get('password', '')
    
    # Validation
    if not name or not email or not password:
        return flask.jsonify({'success': False, 'message': 'All fields are required'})
    
    if len(password) < 6:
        return flask.jsonify({'success': False, 'message': 'Password must be at least 6 characters'})
    
    if email in users:
        return flask.jsonify({'success': False, 'message': 'Email already registered'})
    
    # Create new user
    user_id = str(uuid.uuid4())
    users[email] = {
        'user_id': user_id,
        'name': name,
        'email': email,
        'password': generate_password_hash(password)
    }
    
    # Auto-login after signup
    flask.session['user_id'] = user_id
    flask.session['email'] = email
    flask.session['name'] = name
    
    return flask.jsonify({'success': True, 'message': 'Account created successfully'})

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    flask.session.clear()
    return flask.redirect('/login')

# Dashboard Routes (Protected)

@app.route('/')
@login_required
def index():
    return flask.render_template('index.html')

@app.route('/get_user_info', methods=['GET'])
@login_required
def get_user_info():
    return flask.jsonify({
        'name': flask.session.get('name', 'User'),
        'email': flask.session.get('email', '')
    })

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    data = flask.request.get_json()
    transaction = {
        'id': len(transactions) + 1,
        'type': data['type'],
        'description': data['description'],
        'category': data.get('category', 'Other'),
        'amount': float(data['amount']),
        'payment_mode': data.get('payment_mode', 'Cash'),
        'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    transactions.append(transaction)
    if data['type'] == 'income':
        balance_data['total_income'] += float(data['amount'])
    else:
        balance_data['total_expense'] += float(data['amount'])
    balance_data['remaining'] = balance_data['total_income'] - balance_data['total_expense']
    return flask.jsonify({'success': True, 'transaction': transaction})

@app.route('/get_transactions', methods=['GET'])
def get_transactions():
    return flask.jsonify({'transactions': transactions, 'balance': balance_data})

@app.route('/delete_transaction/<int:trans_id>', methods=['DELETE'])
def delete_transaction(trans_id):
    global transactions
    trans = next((t for t in transactions if t['id'] == trans_id), None)
    if trans:
        if trans['type'] == 'income':
            balance_data['total_income'] -= trans['amount']
        else:
            balance_data['total_expense'] -= trans['amount']
        balance_data['remaining'] = balance_data['total_income'] - balance_data['total_expense']
        transactions = [t for t in transactions if t['id'] != trans_id]
        return flask.jsonify({'success': True})
    return flask.jsonify({'success': False}), 404

@app.route('/update_transaction/<int:trans_id>', methods=['PUT'])
def update_transaction(trans_id):
    global transactions
    trans = next((t for t in transactions if t['id'] == trans_id), None)
    if trans:
        data = flask.request.get_json()
        if trans['type'] == 'income':
            balance_data['total_income'] -= trans['amount']
        else:
            balance_data['total_expense'] -= trans['amount']
        
        trans['description'] = data.get('description', trans['description'])
        trans['category'] = data.get('category', trans.get('category', 'Other'))
        trans['amount'] = float(data.get('amount', trans['amount']))
        trans['payment_mode'] = data.get('payment_mode', trans.get('payment_mode', 'Cash'))
        
        if trans['type'] == 'income':
            balance_data['total_income'] += trans['amount']
        else:
            balance_data['total_expense'] += trans['amount']
        balance_data['remaining'] = balance_data['total_income'] - balance_data['total_expense']
        return flask.jsonify({'success': True, 'transaction': trans})
    return flask.jsonify({'success': False}), 404

@app.route('/expenses', methods=['GET'])
def get_expenses():
    category = flask.request.args.get('category')
    period = flask.request.args.get('period', 'month')
    start_date = flask.request.args.get('start_date')
    end_date = flask.request.args.get('end_date')
    
    expenses = [t for t in transactions if t['type'] == 'expense']
    
    if category:
        expenses = [e for e in expenses if e.get('category', '').lower() == category.lower()]
    
    if start_date or end_date:
        filtered = []
        for e in expenses:
            trans_date = datetime.strptime(e['date'], '%Y-%m-%d %H:%M:%S').date()
            if start_date and trans_date < datetime.strptime(start_date, '%Y-%m-%d').date():
                continue
            if end_date and trans_date > datetime.strptime(end_date, '%Y-%m-%d').date():
                continue
            filtered.append(e)
        expenses = filtered
    
    return flask.jsonify({'expenses': expenses})

@app.route('/dashboard', methods=['GET'])
def dashboard():
    expenses = [t for t in transactions if t['type'] == 'expense']
    income = [t for t in transactions if t['type'] == 'income']
    
    today = datetime.now().date()
    week_ago = today - timedelta(days=7)
    month_start = today.replace(day=1)
    prev_month_start = (month_start - timedelta(days=1)).replace(day=1)
    prev_month_end = month_start - timedelta(days=1)
    
    # Weekly spending
    this_week = sum(e['amount'] for e in expenses if datetime.strptime(e['date'], '%Y-%m-%d %H:%M:%S').date() >= week_ago)
    last_week = sum(e['amount'] for e in expenses if week_ago > datetime.strptime(e['date'], '%Y-%m-%d %H:%M:%S').date() >= (week_ago - timedelta(days=7)))
    
    # Monthly spending
    this_month = sum(e['amount'] for e in expenses if datetime.strptime(e['date'], '%Y-%m-%d %H:%M:%S').date() >= month_start)
    last_month = sum(e['amount'] for e in expenses if prev_month_start <= datetime.strptime(e['date'], '%Y-%m-%d %H:%M:%S').date() <= prev_month_end)
    
    # Category breakdown
    category_spend = defaultdict(float)
    for e in expenses:
        category_spend[e.get('category', 'Other')] += e['amount']
    
    # Top category
    top_category = max(category_spend, key=category_spend.get) if category_spend else None
    top_category_amount = category_spend.get(top_category, 0) if top_category else 0
    
    # Total income this month
    total_income = sum(i['amount'] for i in income if datetime.strptime(i['date'], '%Y-%m-%d %H:%M:%S').date() >= month_start)
    
    # Savings rate
    savings = total_income - this_month
    savings_rate = (savings / total_income * 100) if total_income > 0 else 0
    
    # Budget remaining
    budget_remaining = balance_data['budget'] - this_month
    
    week_comparison = 'increased' if this_week > last_week else 'decreased'
    week_change_percent = abs((this_week - last_week) / last_week * 100) if last_week > 0 else 0
    
    return flask.jsonify({
        'total_spent': balance_data['total_expense'],
        'this_week_spent': this_week,
        'last_week_spent': last_week,
        'this_month_spent': this_month,
        'last_month_spent': last_month,
        'budget': balance_data['budget'],
        'budget_remaining': budget_remaining,
        'savings': savings,
        'savings_rate': savings_rate,
        'category_breakdown': dict(category_spend),
        'top_category': top_category,
        'top_category_amount': top_category_amount,
        'top_category_percent': (top_category_amount / this_month * 100) if this_month > 0 else 0,
        'week_comparison': week_comparison,
        'week_change_percent': week_change_percent,
        'insights': generate_insights(expenses, this_week, last_week, this_month, category_spend)
    })

def generate_insights(expenses, this_week, last_week, this_month, category_spend):
    insights = []
    
    # Weekend spending insight
    today = datetime.now()
    weekend_spend = sum(e['amount'] for e in expenses if datetime.strptime(e['date'], '%Y-%m-%d %H:%M:%S').weekday() >= 5)
    if weekend_spend > this_month * 0.3:
        insights.append(f"📈 Your spending spikes on weekends (₹{weekend_spend:.2f})")
    
    # Top category insight
    if category_spend:
        top_cat = max(category_spend, key=category_spend.get)
        percent = (category_spend[top_cat] / this_month * 100) if this_month > 0 else 0
        insights.append(f"🍔 {top_cat} expenses are {percent:.0f}% of your total spending")
    
    # Savings comparison
    if this_week > last_week and last_week > 0:
        increase = ((this_week - last_week) / last_week * 100)
        insights.append(f"⚠️ You're spending {increase:.0f}% more than last week")
    
    return insights

@app.route('/health', methods=['GET'])
def health():
    return flask.jsonify({'status': 'healthy', 'message': 'Smart Expense Tracker is running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
