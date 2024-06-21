package be.ucll.stagebegeleidingteam10.service;

import be.ucll.stagebegeleidingteam10.model.User;
import be.ucll.stagebegeleidingteam10.model.UserType;
import be.ucll.stagebegeleidingteam10.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User login(String email, String password) {
        User user = userRepository.findUserByEmail(email);
        if (user != null && user.getPassword().equals(password))
            return user;
        else
            throw new ServiceException("LOGIN_FAILED", "Ongeldige e-mail of wachtwoord");
    }

    public User register(User user) {
        // TO DO: Fix constraint violation exception when email already exists
        if (userRepository.findUserByEmail(user.getEmail()) != null)
            throw new ServiceException("error", "Email already exists");
        return userRepository.save(user);
    }
    
    public List<User> findAllByRole(UserType role) {
        return userRepository.findUsersByRole(role);
    }
}