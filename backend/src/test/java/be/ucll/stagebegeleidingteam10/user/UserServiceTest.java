package be.ucll.stagebegeleidingteam10.user;

import be.ucll.stagebegeleidingteam10.model.User;
import be.ucll.stagebegeleidingteam10.model.UserType;
import be.ucll.stagebegeleidingteam10.repo.UserRepository;
import be.ucll.stagebegeleidingteam10.service.ServiceException;
import be.ucll.stagebegeleidingteam10.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @BeforeEach
    public void setUp() {
        //given
        User steven = new User();
    }

    @Test
    void givenValidUser_whenValidLogIn_thenUserIsLoggedInAndIsReturned(){
        //given
        User steven = new User();
        steven.setName("Steven Engels");
        steven.setEmail("steven.engels@ucll.be");
        steven.setNummer("u123");
        steven.setPassword("ikgahetnietvertellenhoor999");
        steven.setRole(UserType.COACH);

        //when
        when(userRepository.findUserByEmail(steven.getEmail())).thenReturn(steven);

        //then

        User loggedInUser = userService.login(steven.getEmail(), steven.getPassword());
        assertEquals("Steven Engels", loggedInUser.getName());
        assertEquals("steven.engels@ucll.be", loggedInUser.getEmail());
        assertEquals("ikgahetnietvertellenhoor999", loggedInUser.getPassword());
        assertEquals("u123", loggedInUser.getNummer());
        assertEquals(UserType.COACH, loggedInUser.getRole());
    }

    @Test
    void givenInvalidUser_whenInvalidLogInPassword_thenUserIsNotLoggedInAndServiceExceptionIsThrown() throws ServiceException {
        //given
        User steven = new User();
        steven.setName("Steven Engels");
        steven.setEmail("steven.engels@ucll.be");
        steven.setNummer("u123");
        steven.setPassword("ikgahetnietvertellenhoor999");
        steven.setRole(UserType.COACH);
        //when
        ServiceException ex = Assertions.assertThrows(ServiceException.class, ()->userService.login(steven.getEmail(),""));

        // then
        assertEquals("LOGIN_FAILED", ex.getAction());
        assertEquals("Ongeldige e-mail of wachtwoord", ex.getMessage());
    }
    @Test
    void givenvalidUser_whenInvalidLogInEmail_thenUserIsNotLoggedInAndServiceExceptionIsThrown() throws ServiceException {
        //given
        User steven = new User();
        steven.setName("Steven Engels");
        steven.setEmail("steven.engels@ucll.be");
        steven.setNummer("u123");
        steven.setPassword("ikgahetnietvertellenhoor999");
        steven.setRole(UserType.COACH);
        //when
        ServiceException ex = Assertions.assertThrows(ServiceException.class, ()->userService.login("", steven.getPassword()));

        // then
        assertEquals("LOGIN_FAILED", ex.getAction());
        assertEquals("Ongeldige e-mail of wachtwoord", ex.getMessage());
    }
    @Test
    void givenListsOfUsers_whenFilteredOnAllStudents_thenAllStudentsAreReturned(){
        //given
        User steven = new User();
        steven.setName("Steven Engels");
        steven.setEmail("steven.engels@ucll.be");
        steven.setNummer("u123");
        steven.setPassword("ikgahetnietvertellenhoor999");
        steven.setRole(UserType.COACH);

        User jorrit = new User();
        steven.setName("Jorrit");
        steven.setEmail("jorrit@ucll.be");
        steven.setNummer("u0166950");
        steven.setPassword("ikgahetnietvertellenhoor999");
        steven.setRole(UserType.MENTOR);

        User hannah = new User();
        steven.setName("Hannah Engels");
        steven.setEmail("Hannah@ucll.be");
        steven.setNummer("r123");
        steven.setPassword("ikgahetnietvertellenhoor999");
        steven.setRole(UserType.STUDENT);

        List<User> listStudents = new ArrayList<>(Collections.singleton(hannah));

        List<User> listStageBegeleiders =new ArrayList<>(Collections.singleton(steven));

        List<User> listStageMentors = new ArrayList<>(Collections.singleton(jorrit));

        //when
        when(userRepository.findUsersByRole(UserType.STUDENT)).thenReturn(listStudents);
        when(userRepository.findUsersByRole(UserType.COACH)).thenReturn(listStageBegeleiders);
        when(userRepository.findUsersByRole(UserType.MENTOR)).thenReturn(listStageMentors);

        //then
        assertEquals(userService.findAllByRole(UserType.STUDENT),listStudents);
        assertEquals(userService.findAllByRole(UserType.COACH),listStageBegeleiders);
        assertEquals(userService.findAllByRole(UserType.MENTOR),listStageMentors);
    }
}