package be.ucll.stagebegeleidingteam10.controller;

import be.ucll.stagebegeleidingteam10.model.OPO;
import be.ucll.stagebegeleidingteam10.service.OPOService;
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
@RequestMapping("/OPO")
@CrossOrigin(origins = "http://localhost:3000")
public class OPORestController {

    @Autowired
    private OPOService opoService;

    @GetMapping
    public List<OPO> getAllOPO() {
        return opoService.getAllOPO();
    }

    @GetMapping("/getByCode")
    public OPO getOPOByCode(@RequestParam("opoCode") String opoCode) {
        return opoService.getOPOByCode(opoCode);
    }

    @PostMapping("/createOPO")
    public OPO createOPO(@Valid @RequestBody OPO opo) {
        return opoService.createOPO(opo);
    }

    @PutMapping("/edit")
    public OPO edit(@RequestBody OPO opo, @RequestParam("opoCode") String opoCode) {
        return opoService.edit(opo, opoCode);
    }

    @DeleteMapping("/remove")
    public OPO deleteOPO(@RequestParam("opoCode") String opoCode){
        return opoService.delete(opoCode);
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
