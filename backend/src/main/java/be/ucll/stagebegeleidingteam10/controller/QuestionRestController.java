package be.ucll.stagebegeleidingteam10.controller;

import be.ucll.stagebegeleidingteam10.model.Answer;
import be.ucll.stagebegeleidingteam10.model.Question;
import be.ucll.stagebegeleidingteam10.service.QuestionService;
import be.ucll.stagebegeleidingteam10.service.ServiceException;
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
import java.util.Map;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/questions")
public class QuestionRestController {

    @Autowired
    QuestionService questionService;

    @PostMapping("/create")
    public Question createQuestion(@Valid @RequestBody Question question, @RequestParam("templateId") long templateId) {
        return questionService.createQuestion(question, templateId);
    }

    @PostMapping("/addAnswer")
    public Question addAnswer(@RequestParam("questionId") long questionId, @RequestParam("userId") String userEmail,
            @RequestParam("formId") long formId, @Valid @RequestBody Answer answer) {
        return questionService.addAnswer(questionId, userEmail, formId, answer);
    }

    @PutMapping("/editQuestion/{templateId}/{questionId}")
    public Question editQuestion(@PathVariable Long templateId, @PathVariable Long questionId,
            @RequestBody Question question) {
        return questionService.editQuestion(question, templateId, questionId);
    }

    @DeleteMapping("/delete/{templateId}/{questionId}")
    public Question deleteQuestion(@PathVariable long templateId, @PathVariable long questionId) {
        return questionService.removeQuestion(templateId, questionId);
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
