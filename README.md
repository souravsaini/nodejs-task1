# Data Aggregation System

It aggregates user data from a MongoDB and creates an endpoint for data summaries.

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/souravsaini/nodejs-task1.git
   cd nodejs-task1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory:

   ```env
   TOKEN_SECRET=<ANY STRING>
   MONGODB_URL="mongodb://localhost:27017/data_aggregation_system"
   PORT=3000
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### Students

#### Add a new student

- Endpoint: `POST /api/v1/students`
- Description: Creates a new student record.
- Parameters:
  - Request Body:
    - `name` (required): The name of the student.
    - `dob` (required): The date of birth of the student (format: YYYY-MM-DD).
    - `grade` (required): The grade/class of the student.

#### Assign Student to Class

- Endpoint: `POST /api/v1/students/:id/class`
- Description: Assign student to class.
- Parameters:
  - Request Body:
    - `classId` (required): The ID of the class.

### Subjects

#### Add a new subject

- Endpoint: `POST /api/v1/subjects`
- Description: Creates a new subject record.
- Parameters:
  - Request Body:
    - `name` (required): The name of the subject.

### Teachers

#### Add a new teacher

- Endpoint: `POST /api/v1/teachers`
- Description: Creates a new teacher record.
- Parameters:
  - Request Body:
    - `name` (required): The name of the teacher.

### Classes

#### Add a new class

- Endpoint: `POST /api/v1/classes`
- Description: Creates a new class.
- Parameters:
  - Request Body:
    - `subjectId` (required): The ID of the class.
    - `teacherId`: (required) The ID of the teacher

#### Summary

#### Get Summary

- Endpoint: `POST /api/v1/summary`
- Description: Get Summary.
- Parameters: none
