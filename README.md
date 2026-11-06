
# Smart Expense Tracker

A web-based personal finance management application designed to help individuals record income, track expenses, organize transactions, and understand their spending habits through a centralized dashboard.

![Project](https://img.shields.io/badge/Project-Smart%20Expense%20Tracker-blue)
![Python](https://img.shields.io/badge/Python-3.x-yellow)
![Flask](https://img.shields.io/badge/Framework-Flask-black)
![Docker](https://img.shields.io/badge/Container-Docker-blue)
![AWS](https://img.shields.io/badge/Cloud-AWS%20EC2-orange)

---

## Project Information

| Attribute | Details |
|---|---|
| Project Name | Smart Expense Tracker |
| Project Type | Team Project |
| Domain | Web Development / Personal Finance / FinTech |
| Project Period | January 2026 – April 2026 |
| Backend | Python, Flask |
| Frontend | HTML, CSS, JavaScript |
| Containerization | Docker |
| CI/CD | Jenkins |
| Cloud Platform | AWS EC2 |
| Team Size | 4 Members |

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [Proposed Solution](#4-proposed-solution)
5. [Features and Modules](#5-features-and-modules)
6. [Technology Stack](#6-technology-stack)
7. [System Architecture](#7-system-architecture)
8. [Application Workflow](#8-application-workflow)
9. [Functional Requirements](#9-functional-requirements)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Installation and Setup](#11-installation-and-setup)
12. [Running the Application](#12-running-the-application)
13. [Docker](#13-docker)
14. [CI/CD with Jenkins](#14-cicd-with-jenkins)
15. [AWS EC2 Deployment](#15-aws-ec2-deployment)
16. [Project Structure](#16-project-structure)
17. [Testing](#17-testing)
18. [Security and Data Considerations](#18-security-and-data-considerations)
19. [Future Enhancements](#19-future-enhancements)
20. [Learning Outcomes](#20-learning-outcomes)
21. [Contributors](#21-contributors)

---

## 1. Project Overview

Managing personal finances is an important part of everyday life. People often make several small and large transactions throughout the day, but may not maintain a consistent record of their income and expenses.

As a result, it becomes difficult to understand spending patterns, identify unnecessary expenses, or determine how much money is available.

**Smart Expense Tracker** is a web application designed to simplify personal financial management. It provides a centralized platform to:

- Record income and expenses.
- Organize transactions into categories.
- Maintain transaction history.
- Calculate available balances.
- Review financial summaries.
- Understand spending habits.

The application uses a Python Flask backend and a browser-based interface developed using HTML, CSS, and JavaScript.

The project also explores modern development and deployment practices using GitHub, Docker, Jenkins, and AWS EC2.

### Project at a Glance

| Component | Technology |
|---|---|
| Application Type | Web Application |
| Domain | Personal Finance Management |
| Backend | Python, Flask |
| Frontend | HTML, CSS, JavaScript |
| Version Control | Git, GitHub |
| Containerization | Docker |
| CI/CD | Jenkins |
| Cloud Deployment | AWS EC2 |

## 2. Problem Statement

Keeping track of personal income and expenses manually can be inconvenient and inconsistent.

People may use notebooks, spreadsheets, or separate applications to record transactions. These methods can make it difficult to maintain an updated overview of their financial activities.

Common problems include:

- Difficulty maintaining regular records of daily transactions.
- Limited visibility into total income and expenditure.
- Difficulty identifying categories where most money is spent.
- Time-consuming manual calculations.
- Lack of a centralized view of financial activity.
- Difficulty reviewing spending trends over time.

The project addresses these challenges by providing a centralized interface for recording, organizing, and reviewing financial transactions.

## 3. Project Objectives

The primary objectives are:

1. Provide a simple interface for recording income and expenses.
2. Maintain an organized history of financial transactions.
3. Categorize expenses for better financial understanding.
4. Calculate total income, expenditure, and available balance.
5. Present financial summaries through a dashboard.
6. Help users identify spending patterns through reports and visualizations.
7. Package the application using Docker.
8. Explore CI/CD practices using Jenkins.
9. Deploy the application on a cloud virtual machine using AWS EC2.

## 4. Proposed Solution

The proposed solution is a browser-based expense tracking system.

A user enters an income or expense transaction through the application interface. The Flask backend receives the submitted information, validates it, performs the required processing, and stores it using the configured data-storage layer.

The dashboard processes transaction records to calculate and display financial summaries.

### Financial Calculations

**Total Income**

Sum of all recorded income transactions.

**Total Expenses**

Sum of all recorded expense transactions.

**Available Balance**

```text
Available Balance = Total Income - Total Expenses
```

Example:

| Financial Attribute | Amount |
|---|---:|
| Total Income | ₹30,000 |
| Total Expenses | ₹12,500 |
| Available Balance | ₹17,500 |

*Note: These figures are illustrative examples and do not represent actual project data.*

## 5. Features and Modules

### 5.1 Dashboard

The dashboard provides a consolidated overview of a user's financial activities.

It is intended to display:

- Total income.
- Total expenses.
- Remaining balance.
- Recent transactions.
- Financial summaries.

### 5.2 Income Management

The income module allows users to record money received from different sources.

A typical income record may contain:

- Amount.
- Income category or source.
- Transaction date.
- Description or notes.

Examples include salary, allowance, freelance work, and other earnings.

### 5.3 Expense Management

The expense module allows users to record money spent.

A typical expense record may contain:

- Amount.
- Expense category.
- Transaction date.
- Description or notes.

Examples include food, travel, shopping, education, bills, and entertainment.

### 5.4 Transaction Management

The transaction module maintains records of financial activities.

Depending on the implemented functionality, users may be able to:

- Add transactions.
- View transaction history.
- Identify income and expense transactions.
- Review transaction details.
- Edit or delete transactions.

### 5.5 Expense Categorization

Expense categorization groups transactions according to their purpose.

| Category | Examples |
|---|---|
| Food | Groceries, restaurants |
| Travel | Bus, train, fuel |
| Education | Books, course fees |
| Shopping | Clothing, accessories |
| Bills | Electricity, internet |
| Entertainment | Movies, subscriptions |

### 5.6 Reports and Analytics

The reports module provides financial summaries to help users understand their spending habits.

Potential reports include:

- Income versus expense summary.
- Category-wise expense distribution.
- Monthly spending summary.
- Spending trends over time.
- Bar charts and pie charts.

The exact reports and visualizations depend on the implemented application.

## 6. Technology Stack

| Technology | Purpose |
|---|---|
| Python | Main backend programming language |
| Flask | Backend web framework |
| HTML5 | Web page structure |
| CSS3 | Styling and layout |
| JavaScript | Client-side interactions |
| Git | Version control |
| GitHub | Source-code hosting and collaboration |
| Docker | Application containerization |
| Jenkins | CI/CD automation |
| AWS EC2 | Cloud deployment |

### Why Flask?

Flask is a lightweight Python web framework that provides routing and request-handling capabilities. It is suitable for building small and medium-sized web applications.

### Why Docker?

Docker packages an application and its dependencies into a container image, helping maintain consistent development and deployment environments.

### Why Jenkins?

Jenkins automates software delivery tasks such as source-code checkout, testing, Docker image building, and deployment.

### Why AWS EC2?

Amazon EC2 provides cloud-based virtual machines that can host web applications and their required runtime environments.

## 7. System Architecture

The application follows a client-server architecture.

```text
+--------------------------------------+
|                USER                  |
|         Web Browser / Interface      |
+------------------+-------------------+
                   |
                   | HTTP Requests
                   |
                   v
+--------------------------------------+
|              FRONTEND                |
|          HTML / CSS / JavaScript     |
+------------------+-------------------+
                   |
                   | Application Requests
                   |
                   v
+--------------------------------------+
|               BACKEND                |
|              Python Flask            |
|                                      |
|  - Request Handling                  |
|  - Input Validation                  |
|  - Transaction Processing            |
|  - Financial Calculations             |
|  - Report Generation                 |
+------------------+-------------------+
                   |
                   v
+--------------------------------------+
|           DATA STORAGE               |
|       Transaction and User Records   |
+--------------------------------------+
```

### Architecture Explanation

1. **User Interface:** Users interact with the application through a web browser.
2. **Frontend:** HTML structures the pages, CSS styles them, and JavaScript handles client-side interactions.
3. **Backend:** Flask receives requests, validates inputs, executes application logic, and prepares responses.
4. **Data Storage:** The configured database or storage layer maintains application records.
5. **Dashboard and Reports:** Stored transactions are processed to calculate financial summaries.

## 8. Application Workflow

The typical transaction workflow is:

```text
             START
               |
               v
        Open Application
               |
               v
         Access Dashboard
               |
               v
      Select Income or Expense
               |
               v
     Enter Transaction Details
               |
               v
          Validate Input
               |
          +----+----+
          |         |
        Valid     Invalid
          |         |
          v         v
      Save Record  Show Error
          |
          v
  Update Financial Summary
          |
          v
   Display Updated Dashboard
          |
          v
             END
```

### Financial Calculation Logic

Let:

- `I` = Total income.
- `E` = Total expenses.
- `B` = Available balance.

The balance is calculated as:

```text
B = I - E
```

For category-wise expense analysis:

```text
E_c = Sum of all expenses belonging to category c
```

Percentage of total expenses spent in a category:

```text
P_c = (E_c / E) * 100
```

These calculations provide the foundation for financial summaries and analytics.

## 9. Functional Requirements

| ID | Requirement |
|---|---|
| FR-01 | Provide a user interface for financial tracking. |
| FR-02 | Allow users to record income transactions. |
| FR-03 | Allow users to record expense transactions. |
| FR-04 | Organize transactions by type and category. |
| FR-05 | Calculate total income. |
| FR-06 | Calculate total expenses. |
| FR-07 | Calculate available balance. |
| FR-08 | Display financial summaries on the dashboard. |
| FR-09 | Provide transaction history. |
| FR-10 | Provide reports and analytics according to implemented features. |

## 10. Non-Functional Requirements

- **Usability:** The interface should be easy to understand and navigate.
- **Performance:** Common operations should respond within a reasonable time.
- **Reliability:** Financial calculations should be consistent and accurate.
- **Maintainability:** The code should be organized for future modifications.
- **Portability:** Docker should help maintain a consistent runtime environment.
- **Scalability:** The architecture should support future improvements.
- **Security:** Inputs and financial records should be handled carefully.

## 11. Installation and Setup

### Prerequisites

Install the following tools:

- Python 3.x
- pip
- Git
- Docker (for container-based execution)

### Step 1: Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_DIRECTORY>
```

Replace the placeholders with your actual repository URL and project directory.

### Step 2: Create a Virtual Environment

**Windows**

```bash
python -m venv venv
venv\Scripts\activate
```

**Linux / macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

If the project contains a `requirements.txt` file:

```bash
pip install -r requirements.txt
```

Otherwise, install the dependencies specified by the application.

### Step 4: Configure Environment Variables

If environment variables are required, create a `.env` file.

Example:

```env
FLASK_ENV=development
SECRET_KEY=replace-with-a-secure-secret
```

Add database configuration variables only if required by the application.

**Important:** Never upload passwords, API keys, or production credentials to GitHub.

## 12. Running the Application

The exact Flask entry point depends on the repository.

For an application with `app.py` as its entry point:

```bash
python app.py
```

Alternatively:

```bash
flask --app app run --debug
```

Open the local address displayed in the terminal. It is commonly:

```text
http://127.0.0.1:5000
```

Follow the actual project configuration if a different entry point or port is used.

## 13. Docker

Docker is used to package the application and its runtime dependencies into a container.

### Example Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

*This is a starting template. Adjust the entry point according to the actual application.*

### Build Docker Image

```bash
docker build -t smart-expense-tracker .
```

### Run Container

```bash
docker run -d \
  --name expense-tracker \
  -p 5000:5000 \
  smart-expense-tracker
```

### View Running Containers

```bash
docker ps
```

### Stop Container

```bash
docker stop expense-tracker
```

### Remove Container

```bash
docker rm expense-tracker
```

For production deployment, use an appropriate WSGI server instead of Flask's development server.

## 14. CI/CD with Jenkins

Jenkins is used to automate repeatable software delivery tasks.

### Suggested Pipeline Stages

1. **Source Checkout:** Retrieve the latest source code from GitHub.
2. **Dependency Installation:** Install required Python packages.
3. **Testing:** Execute automated tests.
4. **Docker Build:** Build the application Docker image.
5. **Deployment:** Deploy the approved build to the target environment.

### Example Jenkinsfile

```groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: '<YOUR_GITHUB_REPOSITORY_URL>'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'python3 -m pip install -r requirements.txt'
            }
        }

        stage('Test') {
            steps {
                sh 'python3 -m pytest'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t smart-expense-tracker .'
            }
        }
    }
}
```

This example demonstrates checkout, dependency installation, testing, and Docker image building. Additional configuration is required for production deployment.

## 15. AWS EC2 Deployment

AWS EC2 can be used to host the application on a cloud-based virtual machine.

### General Deployment Steps

1. Create an EC2 instance in the AWS Management Console.
2. Select an appropriate operating system and instance type.
3. Configure security group rules.
4. Connect to the instance using SSH.
5. Install the required runtime and deployment tools.
6. Retrieve the application source code or Docker image.
7. Configure environment variables and data storage.
8. Start the application or container.
9. Verify that the application is reachable.

### Example Docker-Based Deployment

```bash
docker build -t smart-expense-tracker .

docker run -d \
  --restart unless-stopped \
  --name expense-tracker \
  -p 5000:5000 \
  smart-expense-tracker
```

### Deployment Considerations

- Do not expose development or debugging services publicly.
- Restrict SSH access to trusted IP addresses.
- Use HTTPS for production traffic.
- Store credentials securely.
- Configure persistent storage and backups.
- Use a production-ready application server.
- Keep the operating system and dependencies updated.

## 16. Project Structure

The following is a suggested Flask project structure. The actual repository structure may differ.

```text
smart-expense-tracker/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── Jenkinsfile
├── README.md
├── .gitignore
├── .env.example
│
├── templates/
│   ├── index.html
│   ├── dashboard.html
│   └── transactions.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
│
├── tests/
│   └── test_app.py
│
└── config/
    └── settings.py
```

Keep only files and directories that actually exist in the project.

## 17. Testing

Testing helps verify that the application behaves as expected.

### Suggested Test Cases

| Test Case | Expected Result |
|---|---|
| Add valid income transaction | Income record is saved |
| Add valid expense transaction | Expense record is saved |
| Submit invalid amount | Validation error is displayed |
| Calculate total income | Correct income total is returned |
| Calculate total expenses | Correct expense total is returned |
| Calculate available balance | Income minus expenses is displayed |
| View transaction history | Relevant records are displayed |
| Build Docker image | Image is created successfully |
| Run application container | Application starts and responds |

Automated tests should be run against the actual application code. Do not report a test as passed unless it has been executed successfully.

## 18. Security and Data Considerations

Financial information should be treated as sensitive application data.

Recommended practices include:

- Validate all user inputs on the backend.
- Use parameterized database queries or a safe ORM.
- Protect secret keys and database credentials.
- Implement authentication and authorization if multiple users are supported.
- Ensure users can access only their own financial records.
- Avoid logging sensitive financial information.
- Use HTTPS in production.
- Back up important data securely.
- Avoid committing `.env` files or credentials to GitHub.

## 19. Future Enhancements

The project can be extended with additional features such as:

1. **User Authentication:** Secure registration, login, and logout.
2. **Budget Management:** Allow users to define monthly budgets for categories.
3. **Budget Alerts:** Notify users when spending approaches or exceeds a budget.
4. **Recurring Transactions:** Automatically record recurring income and expenses.
5. **Advanced Analytics:** Add monthly, quarterly, and yearly comparisons.
6. **Export Reports:** Download transaction records in CSV or PDF formats.
7. **Search and Filtering:** Filter transactions by date, category, or amount.
8. **Mobile Responsiveness:** Improve usability on mobile devices.
9. **Multi-Currency Support:** Support transactions in different currencies.
10. **AI-Powered Insights:** Generate spending summaries and personalized suggestions using transaction patterns.

These are proposed improvements and should not be confused with existing features.

## 20. Learning Outcomes

This project provides practical experience in:

- Building a web application using Python and Flask.
- Connecting frontend pages with backend functionality.
- Handling and processing financial transaction data.
- Performing basic financial calculations.
- Organizing application code into manageable modules.
- Using Git and GitHub for version control and collaboration.
- Containerizing applications using Docker.
- Understanding CI/CD concepts with Jenkins.
- Learning cloud deployment concepts using AWS EC2.
- Collaborating with a team throughout the software development lifecycle.

## 21. Contributors

This project was developed collaboratively by:

| Team Member | Contribution |
|---|---|
| Dikshitha A | Project team member |
| Vasudev | Project team member |
| Gangambika DV | Project team member |
| Srujana | Project team member |

*Update the contribution descriptions to reflect each member's actual responsibilities.*

---

## Conclusion

Smart Expense Tracker aims to simplify personal financial management by bringing income records, expense tracking, transaction categorization, and financial summaries into one web application.

By combining Python and Flask for backend development with HTML, CSS, and JavaScript for the frontend, the project demonstrates the development of a practical web-based solution.

The use of Docker, Jenkins, and AWS EC2 also introduces containerization, automation, and cloud deployment practices.

The project can be extended with budgeting, alerts, advanced analytics, report exports, and intelligent spending insights to provide a more comprehensive personal finance management experience.

---

### Developed By

**Dikshitha A | Vasudev | Gangambika DV | Srujana**

**Project Duration:** January 2026 – April 2026
