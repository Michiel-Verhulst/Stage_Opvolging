package be.ucll.stagebegeleidingteam10.answer;

import be.ucll.stagebegeleidingteam10.model.Answer;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class AnswerTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    private String validAnswer = "de communicatie verliep goed";
    private int validRating = 1;
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
    public void givenValidValues_whenAnswerIsCreated_thenAnswerIsAdded() {
        //when
        Answer answer = new Answer();
        answer.setAnswer(validAnswer);
        answer.setRating(validRating);

        //then
        assertNotNull(answer);
        assertEquals(validAnswer, answer.getAnswer());
        assertEquals(validRating, answer.getRating());
    }

    @Test
    void givenBlankAnswer_whenCreatingAnswer_thenAnswerViolationIsThrown() {
        //when
        Answer answer = new Answer();
        answer.setAnswer("");
        answer.setRating(validRating);

        //then
        Set<ConstraintViolation<Answer>> violations = validator.validate(answer);
        assertEquals(1, violations.size());
        ConstraintViolation<Answer> violation = violations.iterator().next();
        assertEquals("must not be blank", violation.getMessage());
    }

    @Test
    void givenNegativeRating_whenCreatingAnswer_thenAnswerViolationIsThrown() {
        //when
        Answer answer = new Answer();
        answer.setAnswer(validAnswer);
        answer.setRating(-1);

        //then
        Set<ConstraintViolation<Answer>> violations = validator.validate(answer);
        assertEquals(1, violations.size());
        ConstraintViolation<Answer> violation = violations.iterator().next();
        assertEquals("must be greater than 0", violation.getMessage());
    }

    @Test
    void givenInvalidRating_whenCreatingAnswer_thenAnswerViolationIsThrown() {
        //when
        Answer answer = new Answer();
        answer.setAnswer(validAnswer);
        answer.setRating(6);

        //then
        Set<ConstraintViolation<Answer>> violations = validator.validate(answer);
        assertEquals(1, violations.size());
        ConstraintViolation<Answer> violation = violations.iterator().next();
        assertEquals("must be less than or equal to 5", violation.getMessage());
    }
}
