package be.ucll.stagebegeleidingteam10.controller;

import be.ucll.stagebegeleidingteam10.model.FormTemplate;
import be.ucll.stagebegeleidingteam10.model.Question;
import be.ucll.stagebegeleidingteam10.service.FormTemplateService;
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
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/forms")
public class FormTemplateRestController {

    @Autowired
    private FormTemplateService formTemplateService;

    @PostMapping("/createTemplate")
    public FormTemplate createFormTemplate(@Valid @RequestBody FormTemplate form, @RequestParam("opoCode") String opoCode) {
        return formTemplateService.createFormTemplate(form, opoCode);
    }
    @GetMapping("/search")
    public FormTemplate getFormTemplateWithId(@RequestParam("templateId") long templateId){
        return formTemplateService.getTemplateWithId(templateId);
    }
    @PostMapping("/addQuestion")
    public FormTemplate addQuestion(@RequestParam("templateId") long templateId, @RequestBody Question question) {
        return formTemplateService.addQuestion(templateId, question);
    }

    @GetMapping("/disabledForms")
    public List<FormTemplate> getNonActiveTemplates() {
        return formTemplateService.getNonActiveTemplates();
    }

    @GetMapping
    public List<FormTemplate> getActiveTemplates() {
        return formTemplateService.getActiveTemplates();
    }

    @PutMapping("/edit")
    public FormTemplate edit(@RequestBody FormTemplate formTemplate, @RequestParam("templateId") long templateId) {
        return formTemplateService.edit(formTemplate,templateId);
    }
    @PutMapping("/disable")
    public FormTemplate disableFormTemplate(@RequestParam("templateId") long templateId){
        return formTemplateService.disable(templateId);
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
