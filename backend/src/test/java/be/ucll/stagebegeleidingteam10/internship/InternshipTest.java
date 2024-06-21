package be.ucll.stagebegeleidingteam10.internship;
import be.ucll.stagebegeleidingteam10.model.Internship;


import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class InternshipTest {

    private static ValidatorFactory validatorFactory;
    private static Validator validator;

    @BeforeAll
    public static void createValidator() {
        validatorFactory = Validation.buildDefaultValidatorFactory();
        validator = validatorFactory.getValidator();
    }

    @AfterAll
    public static void close() {
        validatorFactory.close();
    }

    // Happy case
    @Test
    void givenValidInternship_whenCreating_thenInternshipIsCreatedWithThoseValues() {
        // Given
        LocalDate startDate = LocalDate.now().minusDays(1);
        LocalDate endDate = LocalDate.now().plusDays(10);
        String companyName = "Company Name";

        // When
        Internship internship = new Internship();
        internship.setStartDate(startDate);
        internship.setEndDate(endDate);
        internship.setCompanyName(companyName);

        // Then
        assertNotNull(internship);
        assertEquals(startDate, internship.getStartDate());
        assertEquals(endDate, internship.getEndDate());
        assertEquals(companyName, internship.getCompanyName());
    }

    // Unhappy case
    @Test
    void givenInvalidInternship_whenCreatingInternship_thenValidationViolationsAreThrown() {
        // Given
        Internship internship = new Internship();

        // When (invalid data)
        internship.setStartDate(LocalDate.now().plusDays(1)); // Future start date
        internship.setEndDate(LocalDate.now().minusDays(1)); // Past end date
        internship.setCompanyName(""); // Blank company name
        internship.setLocation("");

        // Then
        Set<ConstraintViolation<Internship>> violations = validator.validate(internship);
        assertEquals(4, violations.size());

        for (ConstraintViolation<Internship> violation : violations) {
            if ("StartDate".equals(violation.getPropertyPath().toString())) {
                assertTrue(violation.getMessage().contains("must be a past date"));
            } else if ("EndDate".equals(violation.getPropertyPath().toString())) {
                assertTrue(violation.getMessage().contains("must be a future date"));
            } else if ("CompanyName".equals(violation.getPropertyPath().toString())) {
                assertTrue(violation.getMessage().contains("must not be blank"));
            }
        }
    }
}
