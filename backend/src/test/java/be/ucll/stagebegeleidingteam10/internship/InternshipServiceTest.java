package be.ucll.stagebegeleidingteam10.internship;

import be.ucll.stagebegeleidingteam10.model.Internship;
import be.ucll.stagebegeleidingteam10.model.User;
import be.ucll.stagebegeleidingteam10.model.UserType;
import be.ucll.stagebegeleidingteam10.repo.InternshipRepository;
import be.ucll.stagebegeleidingteam10.repo.UserRepository;
import be.ucll.stagebegeleidingteam10.service.InternshipService;
import be.ucll.stagebegeleidingteam10.service.ServiceException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InternshipServiceTest {

    @Mock
    private InternshipRepository internshipRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private InternshipService internshipService;

    @Test
    void testGetAllInterships() {
        // Given
        List<Internship> internships = new ArrayList<>();
        internships.add(new Internship());
        internships.add(new Internship());

        // When
        when(internshipRepository.findAll()).thenReturn(internships);

        // Then
        List<Internship> result = internshipService.getAllInterships();
        assertEquals(internships, result);
    }

    @Test
    public void testGetAllIntershipsFromUserNoInternshipsFound() {

        List<Internship> internships = Collections.emptyList();
        Mockito.when(internshipRepository.findAll()).thenReturn(internships);

        assertThrows(ServiceException.class, () -> internshipService.getAllIntershipsFromUser("tester1"));
    }

}



