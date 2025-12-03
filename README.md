# Placement Management System

A full-stack web application built with **Spring Boot** and **MongoDB** for managing student placements. This system provides an intuitive interface for tracking student information, placement status, and related data.

## 🎯 Features

- **Dashboard**: Overview of key placement statistics
- **Student Management**: Add, view, update, and manage student records
- **Placement Tracking**: Monitor student placement status
- **Data Persistence**: MongoDB integration for reliable data storage
- **Responsive UI**: Modern and user-friendly interface
- **RESTful API**: Backend API for seamless data operations

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.3.2**: Enterprise-grade Java framework
- **Spring Data MongoDB**: MongoDB integration for data persistence
- **Java 17**: Latest stable Java version
- **Maven**: Project build and dependency management

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with responsive design
- **JavaScript**: Interactive frontend functionality
- **Font Awesome**: Icon library for UI elements

### Database
- **MongoDB**: NoSQL database for flexible data storage

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Java 17** or higher
- **Maven 3.6+**
- **MongoDB 4.4+** running locally or accessible remotely
- **Git** (optional, for cloning the repository)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/imvarun18/Placement-Management-System.git
cd Placement-Management-System
```

### 2. Configure MongoDB

Ensure MongoDB is running on your system. The default connection URI is:

```
mongodb://localhost:27017/College
```

To modify the MongoDB connection URI, edit `src/main/resources/application.properties`:

```properties
spring.data.mongodb.uri=mongodb://localhost:27017/College
```

### 3. Build the Application

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

Or use the provided wrapper:

```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8085`

## 📁 Project Structure

```
placement-management-system/
├── src/
│   ├── main/
│   │   ├── java/com/example/
│   │   │   ├── PlmntApplication.java          # Main Spring Boot application
│   │   │   ├── controller/
│   │   │   │   └── UserController.java        # REST API endpoints
│   │   │   ├── entity/
│   │   │   │   └── User.java                  # User/Student entity
│   │   │   └── repository/
│   │   │       └── UserRepository.java        # MongoDB repository
│   │   └── resources/
│   │       ├── application.properties          # Application configuration
│   │       └── static/
│   │           ├── index.html                  # Main HTML file
│   │           ├── styles.css                  # Styling
│   │           └── app.js                      # Frontend JavaScript
│   └── test/
│       └── java/com/example/
│           └── PlmntApplicationTests.java     # Unit tests
├── pom.xml                                      # Maven configuration
├── mvnw                                         # Maven wrapper (Unix)
├── mvnw.cmd                                     # Maven wrapper (Windows)
└── README.md                                    # This file
```

## 🔌 API Endpoints & CRUD Operations

### User/Student Endpoints

The backend provides RESTful API endpoints for managing student data. Refer to `UserController.java` for detailed endpoint specifications.

#### ✨ CRUD Operations

| Operation | HTTP Method | Endpoint | Description |
|-----------|-------------|----------|-------------|
| **CREATE** | `POST` | `/api/users` | Create a new student record |
| **READ** | `GET` | `/api/users` | Retrieve all students |
| **READ** | `GET` | `/api/users/{id}` | Get a specific student by ID |
| **UPDATE** | `PUT` | `/api/users/{id}` | Update student information |
| **DELETE** | `DELETE` | `/api/users/{id}` | Delete a student record |

#### Example Requests

**Create a Student (POST)**
```bash
curl -X POST http://localhost:8085/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "placementStatus": "Placed",
    "company": "Tech Corp"
  }'
```

**Get All Students (GET)**
```bash
curl http://localhost:8085/api/users
```

**Get Student by ID (GET)**
```bash
curl http://localhost:8085/api/users/{id}
```

**Update Student (PUT)**
```bash
curl -X PUT http://localhost:8085/api/users/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "placementStatus": "Placed",
    "company": "New Tech Corp"
  }'
```

**Delete Student (DELETE)**
```bash
curl -X DELETE http://localhost:8085/api/users/{id}
```

## 📊 Database Schema

### User Collection (MongoDB)

The User entity stores student and placement information with fields such as:
- Student ID
- Name
- Email
- Phone
- Placement Status
- Company Details
- Placement Date

## 🖥️ Frontend Usage

1. **Dashboard**: View placement statistics and overview
2. **Students Section**: Manage student records and view detailed information
3. **Navigation**: Use the header navigation to switch between different sections

## 🧪 Testing

Run unit tests with Maven:

```bash
mvn test
```

## 📝 Application Configuration

Key configuration properties in `application.properties`:

```properties
spring.application.name=plmnt
server.port=8085
spring.data.mongodb.uri=mongodb://localhost:27017/College
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Varun** - [GitHub Profile](https://github.com/imvarun18)

## 📞 Support

For issues, questions, or suggestions, please open an issue on the [GitHub repository](https://github.com/imvarun18/Placement-Management-System/issues).

## 🔗 Related Links

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Maven Documentation](https://maven.apache.org/)

---

**Happy Coding! 🚀**
