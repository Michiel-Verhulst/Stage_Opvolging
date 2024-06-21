package be.ucll.stagebegeleidingteam10.question;

import be.ucll.stagebegeleidingteam10.model.*;
import be.ucll.stagebegeleidingteam10.repo.AnswerRepository;
import be.ucll.stagebegeleidingteam10.repo.FormTemplateRepository;
import be.ucll.stagebegeleidingteam10.repo.QuestionRepository;
import be.ucll.stagebegeleidingteam10.repo.UserRepository;
import be.ucll.stagebegeleidingteam10.service.QuestionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class QuestionServiceTest {

    @Mock
    QuestionRepository questionRepository;

    @Mock
    FormTemplateRepository formTemplateRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    AnswerRepository answerRepository;

    @InjectMocks
    QuestionService questionService;

    @Test
    public void givenValidQuestion_whenCreatingQuestion_thenQuestionIsAdded() {
        //given
        FormTemplate template = new FormTemplate();
        template.setId(1);
        template.setTitle("begeleiding");
        template.setType(FormTemplateType.EVALUATION);
        formTemplateRepository.save(template);

        Question question = new Question();
        question.setQuestion("Example Answer");
        question.setType(QuestionType.RATING);

        when(formTemplateRepository.findById(template.id)).thenReturn(Optional.of(template));
        when(questionRepository.save(question)).thenReturn(question);

        //when
        Question added = questionService.createQuestion(question, 1);

        //then
        assertEquals(question.getQuestion(), added.getQuestion());
        assertEquals(question.getTemplate(), template);
        assertEquals(template.getQuestions().size(), 1);
    }
}
