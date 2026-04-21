import flask
from datetime import datetime

app = flask.Flask(__name__)

transactions = []
balance_data = {'total_income': 0, 'total_expense': 0, 'remaining': 0}

@app.route('/')
def index():
    return flask.render_template('index.html')

@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    data = flask.request.get_json()
    transaction = {
        'id': len(transactions) + 1,
        'type': data['type'],
        'description': data['description'],
        'amount': float(data['amount']),
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

@app.route('/health', methods=['GET'])
def health():
    return flask.jsonify({'status': 'healthy', 'message': 'Smart Expense Tracker is running'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
