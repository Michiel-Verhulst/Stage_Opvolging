package be.ucll.stagebegeleidingteam10.question;

import be.ucll.stagebegeleidingteam10.model.Answer;
import be.ucll.stagebegeleidingteam10.model.Question;
import be.ucll.stagebegeleidingteam10.model.QuestionType;
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

class QuestionTest {
    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    private String validQuestion =  "hoe verliep de communicatie?";
    private QuestionType validType = QuestionType.RATING;

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
    public void givenValidValues_whenQuestionIsCreated_thenQuestionIsAdded() {
        //when
        Question question = new Question();
        question.setQuestion(validQuestion);
        question.setType(validType);

        //then
        assertNotNull(question);
        assertEquals(validQuestion, question.getQuestion());
        assertEquals(validType, question.getType());
    }

    @Test
    public void givenBlankQuestion_whenQuestionIsCreated_thenViolationIsThrown() {
        //when
        Question question = new Question();
        question.setQuestion("");
        question.setType(validType);

        //then
        Set<ConstraintViolation<Question>> violations = validator.validate(question);
        assertEquals(1, violations.size());
        ConstraintViolation<Question> violation = violations.iterator().next();
        assertEquals("must not be blank", violation.getMessage());
    }

    @Test
    public void givenNullType_whenQuestionIsCreated_thenViolationIsThrown() {
        //when
        Question question = new Question();
        question.setQuestion(validQuestion);
        question.setType(null);

        //then
        Set<ConstraintViolation<Question>> violations = validator.validate(question);
        assertEquals(1, violations.size());
        ConstraintViolation<Question> violation = violations.iterator().next();
        assertEquals("must not be null", violation.getMessage());
    }

    @Test
    public void givenValidQuestion_whenValidAnswerAddedToQuestion_thenAnswerIsAdded() {
        //given
        Answer answer = new Answer();
        answer.setAnswer("Example Answer");
        answer.setRating(4);

        Question question = new Question();
        question.setQuestion(validQuestion);
        question.setType(validType);

        //when
        question.addAnswer(answer);

        //then
        assertEquals(answer, question.getAnswers().get(0));
        assertEquals(question.getAnswers().size(), 1);
        assertEquals(answer.getQuestion(), question);
    }
}