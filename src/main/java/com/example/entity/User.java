package com.example.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
    @Id
    private String userId;
    private String name;
    private String rollNumber;
    private String email;
    private String phone;
    private String placementStatus;
    private String company;
    private String placementDate;
    
    // Default constructor
    public User() {
    }
    
    // Parametrized constructor
    public User(String name, String rollNumber, String email, String phone, String placementStatus, String company, String placementDate) {
        super();
        this.name = name;
        this.rollNumber = rollNumber;
        this.email = email;
        this.phone = phone;
        this.placementStatus = placementStatus;
        this.company = company;
        this.placementDate = placementDate;
    }
    
    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getRollNumber() {
        return rollNumber;
    }
    
    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getPlacementStatus() {
        return placementStatus;
    }
    
    public void setPlacementStatus(String placementStatus) {
        this.placementStatus = placementStatus;
    }
    
    public String getCompany() {
        return company;
    }
    
    public void setCompany(String company) {
        this.company = company;
    }
    
    public String getPlacementDate() {
        return placementDate;
    }
    
    public void setPlacementDate(String placementDate) {
        this.placementDate = placementDate;
    }
}

