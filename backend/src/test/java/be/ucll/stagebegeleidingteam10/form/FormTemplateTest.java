package be.ucll.stagebegeleidingteam10.form;

import be.ucll.stagebegeleidingteam10.model.FormTemplate;
import be.ucll.stagebegeleidingteam10.model.FormTemplateType;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

class FormTemplateTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    private String validTitle = "Formulier";
    private FormTemplateType validType = FormTemplateType.CONCLUSION;
    private String validStudy = "Ti";

    @BeforeAll
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    public static void close() {
        validatorFactory.close();
    }

    @Test
    void givenValidValues_whenCreatingForm_thenFormIsCreated() {
        //when
        FormTemplate formTemplate = new FormTemplate();
        formTemplate.setTitle(validTitle);
        formTemplate.setType(validType);

        //then
        assertNotNull(formTemplate);
        assertEquals(validTitle, formTemplate.getTitle());
        assertEquals(validType, formTemplate.getType());
    }

    @Test
    void givenBlankTitle_whenCreatingForm_thenViolationIsThrown() {
        //when
        FormTemplate formTemplate = new FormTemplate();
        formTemplate.setTitle("");
        formTemplate.setType(FormTemplateType.CONCLUSION);

        //then
        Set<ConstraintViolation<FormTemplate>> violations = validator.validate(formTemplate);
        assertEquals(1, violations.size());
        ConstraintViolation<FormTemplate> violation = violations.iterator().next();
        assertEquals("must not be blank", violation.getMessage());
    }

    @Test
    void givenNullType_whenCreatingForm_thenFormViolationIsThrown() {
        //when
        FormTemplate formTemplate = new FormTemplate();
        formTemplate.setTitle(validTitle);
        formTemplate.setType(null);

        //then
        Set<ConstraintViolation<FormTemplate>> violations = validator.validate(formTemplate);
        assertEquals(1, violations.size());
        ConstraintViolation<FormTemplate> violation = violations.iterator().next();
        assertEquals("must not be null", violation.getMessage());
    }

    @Test
    void givenBlankStudy_whenCreatingForm_thenFormViolationIsThrown() {
        //when
        FormTemplate formTemplate = new FormTemplate();
        formTemplate.setTitle(validTitle);
        formTemplate.setType(validType);

        //then
        Set<ConstraintViolation<FormTemplate>> violations = validator.validate(formTemplate);
        assertEquals(1, violations.size());
        ConstraintViolation<FormTemplate> violation = violations.iterator().next();
        assertEquals("must not be blank", violation.getMessage());
    }
}
