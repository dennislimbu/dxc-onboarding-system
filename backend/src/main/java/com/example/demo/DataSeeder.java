package com.example.demo;

import com.example.demo.model.Task;
import com.example.demo.model.User;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public DataSeeder(UserRepository userRepository, TaskRepository taskRepository) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        User sam = createUser("Sam Smith", "sam.smith@dxc.com", "USER", "IPE", "Junior Software Engineer", "London", 65);
        User emily = createUser("Emily Carter", "emily.carter@dxc.com", "USER", "IPE", "Frontend Developer", "Birmingham", 45);
        User james = createUser("James Walker", "james.walker@dxc.com", "USER", "IPE", "Backend Developer", "Manchester", 25);
        User sarah = createUser("Sarah Johnson", "sarah.johnson@dxc.com", "MANAGER", "IPE", "Team Manager", "Manchester", 100);
        User olivia = createUser("Olivia Green", "olivia.green@dxc.com", "ADMIN", "Operations", "Platform Administrator", "Glasgow", 100);

        createTask(sam, "Complete Security Training", "Mandatory security module", "OPEN", "MANDATORY", "VIDEO", LocalDate.now().plusDays(7));
        createTask(sam, "Install Development Environment", "Install Java, Node.js and VS Code", "IN_PROGRESS", "MANDATORY", "SOFTWARE", LocalDate.now().plusDays(3));
        createTask(sam, "Read Engineering Handbook", "Review technical standards", "COMPLETED", "RECOMMENDED", "DOCUMENT", LocalDate.now().minusDays(2));

        createTask(emily, "Complete HR Induction", "Review HR policies", "OPEN", "MANDATORY", "DOCUMENT", LocalDate.now().minusDays(5));
        createTask(emily, "Set Up GitHub Access", "Confirm repository access", "IN_PROGRESS", "MANDATORY", "SOFTWARE", LocalDate.now().plusDays(4));

        createTask(james, "Complete Java Training", "Review Java backend standards", "OPEN", "MANDATORY", "VIDEO", LocalDate.now().minusDays(10));
        createTask(james, "Review IPE Architecture", "Read architecture overview", "OPEN", "MANDATORY", "DOCUMENT", LocalDate.now().minusDays(3));
    }

    private User createUser(String fullName, String email, String role, String department, String jobTitle, String location, int progress) {
        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setRole(role);
        user.setDepartment(department);
        user.setJobTitle(jobTitle);
        user.setLocation(location);
        user.setOnboardingProgress(progress);
        return userRepository.save(user);
    }

    private void createTask(User user, String title, String description, String status, String category, String type, LocalDate dueDate) {
        Task task = new Task();
        task.setAssignedUser(user);
        task.setTitle(title);
        task.setDescription(description);
        task.setStatus(status);
        task.setCategory(category);
        task.setType(type);
        task.setDueDate(dueDate);
        taskRepository.save(task);
    }
}