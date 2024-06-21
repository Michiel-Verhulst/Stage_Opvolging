package be.ucll.stagebegeleidingteam10.controller;

import be.ucll.stagebegeleidingteam10.model.User;
import be.ucll.stagebegeleidingteam10.model.UserType;
import be.ucll.stagebegeleidingteam10.service.ServiceException;
import be.ucll.stagebegeleidingteam10.service.UserService;
import jakarta.persistence.PersistenceException;
import jakarta.validation.Valid;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserRestController {

    @Autowired
    private UserService userService;


    @PostMapping("/login")
    public User Login(@RequestBody Map<String, String> credentails) {
        return userService.login(credentails.get("email"), credentails.get("password"));
    }

    @PostMapping("/register")
    public User Register(@Valid @RequestBody User user) {
        return userService.register(user);
    }

    @GetMapping("/overview")
    public List<User> FindAllByRole(@RequestParam("role") UserType role) {
        return userService.findAllByRole(role);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({MethodArgumentNotValidException.class, ServiceException.class, ResponseStatusException.class, PersistenceException.class})
    public Map<String, String> handleValidationExceptions(Exception ex) {
        Map<String, String> errors = new HashMap<>();
        if (ex instanceof MethodArgumentNotValidException) {
            ((MethodArgumentNotValidException)ex).getBindingResult().getAllErrors().forEach((error) -> {
                String fieldName = ((FieldError) error).getField();
                String errorMessage = error.getDefaultMessage();
                //String localizedErrorMessage = messageSource.getMessage(errorMessage, null, LocaleContextHolder.getLocale());
                errors.put(fieldName, errorMessage);
            });
        }
        else if (ex instanceof ServiceException) {
            errors.put(((ServiceException) ex).getAction(), ex.getMessage());
        } else if(ex.getCause() instanceof ConstraintViolationException) {
            errors.put("databaseError", "Deze user is niet uniek (Bestaat al)");
        } else {
            errors.put(((ResponseStatusException) ex).getReason(), ex.getCause().getMessage());
        }
        return errors;
    }
}
