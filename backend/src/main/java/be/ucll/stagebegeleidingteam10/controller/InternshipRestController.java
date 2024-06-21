package be.ucll.stagebegeleidingteam10.controller;

import be.ucll.stagebegeleidingteam10.model.Form;
import be.ucll.stagebegeleidingteam10.model.Internship;
import be.ucll.stagebegeleidingteam10.model.User;
import be.ucll.stagebegeleidingteam10.service.InternshipService;
import be.ucll.stagebegeleidingteam10.service.ServiceException;
import jakarta.persistence.PersistenceException;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/internships")
@CrossOrigin(origins = "http://localhost:3000")
public class InternshipRestController {

    @Autowired
    private InternshipService internshipService;

    @GetMapping
    public List<Internship> getInternshipsByCoordinator() {
        return internshipService.getAllInterships();
    }

    @GetMapping("/begeleider")
    public List<Internship> getInternshipsForBegeleider() {
        return internshipService.getAllIntershipsFromBegeleider();
    }

    @GetMapping("/location/{id}")
    public String getInternshipLocationById(@PathVariable long id) {
        return internshipService.getInternshipLocationById(id);
    }

    @PostMapping("/addForm")
    public Form addForm(@RequestParam("formId") long formId, @RequestParam("internshipId") long internshipId ) {
        return internshipService.addForm(internshipId, formId);
    }

    @PostMapping("/addUser")
    public Internship addUser(@RequestParam("internshipId") long internshipId, @RequestBody User user) {
        return internshipService.addUser(internshipId, user);
    }

    @GetMapping("/user")
    public List<Internship> getInternshipsForUser(@RequestParam String rnummer) {
        return internshipService.getAllIntershipsFromUser(rnummer);
    }

    @GetMapping("/forms/{id}")
    public List<Form> getFormsOfInternship(@PathVariable long id) {
        return internshipService.getFormsOfInternship(id);
    }

    @PutMapping("/update")
    public Internship updateInternship(@RequestBody Internship internship) {        
        return internshipService.updateInternship(internship);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({ MethodArgumentNotValidException.class, ServiceException.class, ResponseStatusException.class,
            PersistenceException.class })
    public Map<String, String> handleValidationExceptions(Exception ex) {
        Map<String, String> errors = new HashMap<>();
        if (ex instanceof MethodArgumentNotValidException) {
            ((MethodArgumentNotValidException) ex).getBindingResult().getAllErrors().forEach((error) -> {
                String fieldName = ((FieldError) error).getField();
                String errorMessage = error.getDefaultMessage();
                // String localizedErrorMessage = messageSource.getMessage(errorMessage, null,
                // LocaleContextHolder.getLocale());
                errors.put(fieldName, errorMessage);
            });
        } else if (ex instanceof ServiceException) {
            errors.put(((ServiceException) ex).getAction(), ex.getMessage());
        } else if (ex.getCause() instanceof ConstraintViolationException) {
            errors.put("error", ex.getMessage());
            errors.put("databaseError", "Deze user is niet uniek (Bestaat al)");
        } else {
            errors.put(((ResponseStatusException) ex).getReason(), ex.getCause().getMessage());
        }
        return errors;
    }
}
