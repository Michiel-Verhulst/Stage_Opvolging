package be.ucll.stagebegeleidingteam10.controller;

import be.ucll.stagebegeleidingteam10.model.CurrentPhase;
import be.ucll.stagebegeleidingteam10.model.Form;
import be.ucll.stagebegeleidingteam10.service.FormService;
import be.ucll.stagebegeleidingteam10.service.ServiceException;
import jakarta.persistence.PersistenceException;
import jakarta.validation.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/forms")
 public class FormRestController {

    @Autowired
    private FormService formService;

    @PutMapping("/phase/edit")
    public Form edit(@RequestParam("formId") long formId, @RequestParam("phase") CurrentPhase phase) {
        return formService.editPhase(formId, phase);
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
