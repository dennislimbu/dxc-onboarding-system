package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "app_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String role;
    private String department;
    private String jobTitle;
    private String location;
    private int onboardingProgress;

    public User() {}

    public User(Long id, String fullName, String email, String role, String department, String jobTitle, String location, int onboardingProgress) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.department = department;
        this.jobTitle = jobTitle;
        this.location = location;
        this.onboardingProgress = onboardingProgress;
    }

    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getDepartment() { return department; }
    public String getJobTitle() { return jobTitle; }
    public String getLocation() { return location; }
    public int getOnboardingProgress() { return onboardingProgress; }

    public void setId(Long id) { this.id = id; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
    public void setDepartment(String department) { this.department = department; }
    public void setJobTitle(String jobTitle) { this.jobTitle = jobTitle; }
    public void setLocation(String location) { this.location = location; }
    public void setOnboardingProgress(int onboardingProgress) { this.onboardingProgress = onboardingProgress; }
}