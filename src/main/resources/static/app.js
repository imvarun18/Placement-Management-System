/* ============================================
   API Configuration & Global Variables
   ============================================ */
const API_BASE_URL = 'http://localhost:8085/api/users';
const ENDPOINTS = {
    ADD_USER: '',
    GET_ALL_USERS: ''
};

let allStudents = [];
let activityLog = [];

/* ============================================
   Initialization
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    loadStudents();
    loadDashboard();
}

/* ============================================
   Event Listeners Setup
   ============================================ */
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // Form
    document.getElementById('studentForm').addEventListener('submit', handleAddStudent);
    document.getElementById('studentForm').addEventListener('reset', () => {
        clearFormErrors();
    });

    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
}

/* ============================================
   Navigation Handler
   ============================================ */
function handleNavigation(e) {
    e.preventDefault();
    
    // Get section from data attribute
    const sectionId = this.getAttribute('data-section');
    
    // Remove active class from all nav links and sections
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Add active class to clicked nav link
    this.classList.add('active');
    
    // Show corresponding section
    document.getElementById(sectionId).classList.add('active');
    
    // Reload data when switching to students section
    if (sectionId === 'students') {
        loadStudents();
    } else if (sectionId === 'dashboard') {
        loadDashboard();
    }
}

/* ============================================
   Dashboard Functions
   ============================================ */
function loadDashboard() {
    updateDashboardStats();
    loadActivityLog();
}

function updateDashboardStats() {
    document.getElementById('totalStudents').textContent = allStudents.length;
    document.getElementById('registeredCount').textContent = allStudents.length;
    
    const successRate = allStudents.length > 0 ? '85%' : '0%';
    document.getElementById('successRate').textContent = successRate;
}

function loadActivityLog() {
    const activityContainer = document.getElementById('activityLog');
    
    if (activityLog.length === 0) {
        activityContainer.innerHTML = '<p class="empty-state">No recent activity</p>';
        return;
    }
    
    activityContainer.innerHTML = activityLog
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 5)
        .map(activity => `
            <div class="activity-item">
                <div class="activity-item-title">
                    <i class="fas fa-${getActivityIcon(activity.type)}"></i>
                    ${activity.message}
                </div>
                <div class="activity-item-time">${formatTime(activity.timestamp)}</div>
            </div>
        `).join('');
}

function getActivityIcon(type) {
    const icons = {
        'add': 'user-plus',
        'remove': 'user-minus',
        'update': 'edit',
        'view': 'eye'
    };
    return icons[type] || 'bell';
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
}

/* ============================================
   Student Management Functions
   ============================================ */
function handleAddStudent(e) {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value.trim();
    const rollNumber = document.getElementById('rollNumber').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const phone = document.getElementById('studentPhone').value.trim();
    const placementStatus = document.getElementById('placementStatus').value.trim();
    const company = document.getElementById('company').value.trim();
    const placementDate = document.getElementById('placementDate').value.trim();
    
    // Validation
    if (!validateForm(name, rollNumber)) {
        return;
    }
    
    // Add student via API
    addStudent(name, rollNumber, email, phone, placementStatus, company, placementDate);
}

function validateForm(name, rollNumber) {
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate name
    if (!name) {
        showFieldError('studentName', 'Name is required');
        isValid = false;
    } else if (name.length < 3) {
        showFieldError('studentName', 'Name must be at least 3 characters');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        showFieldError('studentName', 'Name can only contain letters and spaces');
        isValid = false;
    }
    
    // Validate roll number
    if (!rollNumber) {
        showFieldError('rollNumber', 'Roll Number is required');
        isValid = false;
    } else if (rollNumber.length < 2) {
        showFieldError('rollNumber', 'Roll Number must be at least 2 characters');
        isValid = false;
    } else if (allStudents.some(s => s.rollNumber === rollNumber)) {
        showFieldError('rollNumber', 'This Roll Number already exists');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

async function addStudent(name, rollNumber, email, phone, placementStatus, company, placementDate) {
    const studentData = {
        name: name,
        rollNumber: rollNumber,
        email: email || null,
        phone: phone || null,
        placementStatus: placementStatus || null,
        company: company || null,
        placementDate: placementDate || null
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to add student');
        }
        
        const newStudent = await response.json();
        allStudents.push(newStudent);
        
        // Add activity log
        addActivity('add', `Added student: ${name} (${rollNumber})`);
        
        showToast(`Student ${name} added successfully!`, 'success');
        document.getElementById('studentForm').reset();
        clearFormErrors();
        
        loadStudents();
        updateDashboardStats();
        
    } catch (error) {
        console.error('Error adding student:', error);
        showToast('Error adding student: ' + error.message, 'error');
    }
}

async function loadStudents() {
    try {
        const response = await fetch(`${API_BASE_URL}`);
        
        if (!response.ok) {
            throw new Error('Failed to load students');
        }
        
        allStudents = await response.json();
        renderStudentsTable(allStudents);
        updateDashboardStats();
        
    } catch (error) {
        console.error('Error loading students:', error);
        showToast('Error loading students. Please refresh the page.', 'error');
        renderStudentsTable([]);
    }
}

function renderStudentsTable(students) {
    const tbody = document.getElementById('studentsTableBody');
    const countDisplay = document.getElementById('studentCount');
    
    if (students.length === 0) {
        tbody.innerHTML = `
            <tr class="empty-row">
                <td colspan="7" class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>No students enrolled yet</p>
                </td>
            </tr>
        `;
        countDisplay.textContent = 'Showing 0 students';
        return;
    }
    
    tbody.innerHTML = students.map(student => `
        <tr>
            <td><strong>${escapeHtml(student.rollNumber)}</strong></td>
            <td>${escapeHtml(student.name)}</td>
            <td>${escapeHtml(student.email || '-')}</td>
            <td>${escapeHtml(student.phone || '-')}</td>
            <td><span class="status-badge status-${(student.placementStatus || 'pending').toLowerCase()}">${escapeHtml(student.placementStatus || 'Pending')}</span></td>
            <td>${escapeHtml(student.company || '-')}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-primary btn-small" onclick="viewStudentDetails('${escapeHtml(student.userId)}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-danger btn-small" onclick="deleteStudent('${escapeHtml(student.userId)}', '${escapeHtml(student.name)}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    countDisplay.textContent = `Showing ${students.length} student${students.length !== 1 ? 's' : ''}`;
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    let filtered = allStudents;
    
    if (searchTerm) {
        filtered = allStudents.filter(student => 
            student.name.toLowerCase().includes(searchTerm) ||
            student.rollNumber.toLowerCase().includes(searchTerm)
        );
        addActivity('view', `Searched for: "${searchTerm}"`);
    }
    
    renderStudentsTable(filtered);
}

function viewStudentDetails(userId) {
    const student = allStudents.find(s => s.userId === userId);
    if (student) {
        const details = `Name: ${student.name}
Roll Number: ${student.rollNumber}
Email: ${student.email || 'N/A'}
Phone: ${student.phone || 'N/A'}
Placement Status: ${student.placementStatus || 'Pending'}
Company: ${student.company || 'N/A'}
Placement Date: ${student.placementDate || 'N/A'}
User ID: ${student.userId}`;
        alert(details);
        addActivity('view', `Viewed student: ${student.name}`);
    }
}

async function deleteStudent(userId, studentName) {
    if (confirm(`Are you sure you want to delete ${studentName}?`)) {
        try {
            const response = await fetch(`${API_BASE_URL}/${userId}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error('Failed to delete student');
            }
            
            allStudents = allStudents.filter(s => s.userId !== userId);
            renderStudentsTable(allStudents);
            addActivity('remove', `Deleted student: ${studentName}`);
            showToast(`Student ${studentName} deleted successfully!`, 'success');
            updateDashboardStats();
        } catch (error) {
            console.error('Error deleting student:', error);
            showToast('Error deleting student: ' + error.message, 'error');
            loadStudents();
        }
    }
}

/* ============================================
   Activity Log Functions
   ============================================ */
function addActivity(type, message) {
    activityLog.push({
        type: type,
        message: message,
        timestamp: Date.now()
    });
    
    // Keep only last 50 activities
    if (activityLog.length > 50) {
        activityLog = activityLog.slice(-50);
    }
}

/* ============================================
   Toast Notification System
   ============================================ */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* ============================================
   Utility Functions
   ============================================ */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/* ============================================
   Error Handling & Logging
   ============================================ */
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showToast('An unexpected error occurred', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    showToast('An unexpected error occurred', 'error');
});
