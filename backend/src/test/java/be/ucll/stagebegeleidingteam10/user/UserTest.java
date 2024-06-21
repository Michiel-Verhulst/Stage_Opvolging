package be.ucll.stagebegeleidingteam10.user;

import be.ucll.stagebegeleidingteam10.model.User;
import be.ucll.stagebegeleidingteam10.model.UserType;
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

class UserTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    // given
    private String validNameSteven = "Steven Engels";
    private String validEmailSteven = "steven.engels@ucll.be";
    private String validPasswordSteven = "ikgahetnietvertellenhoor999";
    private String validNummerSteven = "u123";
    private UserType validRoleSteven = UserType.COACH;

    @BeforeAll
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    public static void close() {
        validatorFactory.close();
    }

    //happy case
    @Test
    void givenValidUser_whenCreating_thenUserIsCreatedWithThoseValues() {
        //when
        User steven = new User();
        steven.setName(validNameSteven);
        steven.setEmail(validEmailSteven);
        steven.setNummer(validNummerSteven);
        steven.setPassword(validPasswordSteven);
        steven.setRole(validRoleSteven);

        //then
        assertNotNull(steven);
        assertEquals(validNameSteven, steven.getName());
        assertEquals(validEmailSteven, steven.getEmail());
        assertEquals(validPasswordSteven, steven.getPassword());
        assertEquals(validNummerSteven, steven.getNummer());
        assertEquals(validRoleSteven, steven.getRole());
    }

    @Test
    void givenBlankName_whenCreatingUser_thenViolationIsThrown() {
        //when
        User steven = new User();
        steven.setName("");
        steven.setEmail(validEmailSteven);
        steven.setNummer(validNummerSteven);
        steven.setPassword(validPasswordSteven);
        steven.setRole(validRoleSteven);

        //then
        Set<ConstraintViolation<User>> violations = validator.validate(steven);
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Naam mag niet leeg zijn", violation.getMessage());
    }

    @Test
    void givenBlankEmail_whenCreatingUser_thenViolationIsThrown() {
        //when
        User steven = new User();
        steven.setName(validNameSteven);
        steven.setEmail("");
        steven.setNummer(validNummerSteven);
        steven.setPassword(validPasswordSteven);
        steven.setRole(validRoleSteven);

        //then
        Set<ConstraintViolation<User>> violations = validator.validate(steven);
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Ongeldige email", violation.getMessage());
    }

    @Test
    void givenBlankNummer_whenCreatingUser_thenViolationIsThrown() {
        //when
        User steven = new User();
        steven.setName(validNameSteven);
        steven.setEmail(validEmailSteven);
        steven.setNummer("");
        steven.setPassword(validPasswordSteven);
        steven.setRole(validRoleSteven);

        //then
        Set<ConstraintViolation<User>> violations = validator.validate(steven);
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Ongeldige nummer", violation.getMessage());
    }

    @Test
    void givenBlankPassword_whenCreatingUser_thenViolationIsThrown() {
        //when
        User steven = new User();
        steven.setName(validNameSteven);
        steven.setEmail(validEmailSteven);
        steven.setNummer(validNummerSteven);
        steven.setPassword("");
        steven.setRole(validRoleSteven);

        //then
        Set<ConstraintViolation<User>> violations = validator.validate(steven);
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Password mag niet leeg zijn", violation.getMessage());
    }

    @Test
    void givenNullOption_whenCreatingUser_thenViolationIsThrown() {
        //when
        User steven = new User();
        steven.setName(validNameSteven);
        steven.setEmail(validEmailSteven);
        steven.setNummer(validNummerSteven);
        steven.setPassword(validPasswordSteven);
        steven.setRole(null);

        //then
        Set<ConstraintViolation<User>> violations = validator.validate(steven);
        assertEquals(1, violations.size());
        ConstraintViolation<User> violation = violations.iterator().next();
        assertEquals("Role mag niet null zijn", violation.getMessage());
    }
}