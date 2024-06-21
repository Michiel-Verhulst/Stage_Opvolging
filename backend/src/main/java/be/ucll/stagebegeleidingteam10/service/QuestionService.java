package be.ucll.stagebegeleidingteam10.service;

import be.ucll.stagebegeleidingteam10.model.*;
import be.ucll.stagebegeleidingteam10.repo.*;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private FormTemplateRepository formTemplateRepository;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FormRepository formRepository;

    public Question createQuestion(Question question, long templateId) {
        System.out.println(templateId);
        System.out.println(question);
        FormTemplate template = formTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ServiceException("notfound", "Template not found"));
        template.addQuestion(question);
        System.out.println(template);
        return questionRepository.save(question);
    }

    public Question addAnswer(long questionId, String userEmail, long formId, Answer answer) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new ServiceException("notfound", "Question not found"));
        User user = userRepository.findById(userEmail)
                .orElseThrow(() -> new ServiceException("notfound", "User not found"));
        Form form = formRepository.findById(formId)
                .orElseThrow(() -> new ServiceException("notfound", "Form not found"));

        form.addAnswer(answer);
        user.addAnswer(answer);
        question.addAnswer(answer);

        answerRepository.save(answer);
        return question;
    }

    public Question editQuestion(Question updated, long templateId, long questionId) {
        FormTemplate template = formTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ServiceException("notfound", "Template not found"));

        for (Question existingQuestion : template.getQuestions()) {
            if (existingQuestion.getId() == questionId) {

                existingQuestion.setQuestion(updated.getQuestion());
                existingQuestion.setDescription(updated.getDescription());
                existingQuestion.setType(updated.getType());

                formTemplateRepository.save(template);

                return questionRepository.save(existingQuestion);
            }
        }
        throw new ServiceException("notfound", "Question not found in the template");
    }

    public Question removeQuestion(long templateId, long questionId) {
        FormTemplate template = formTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ServiceException("notfound", "Template not found"));
        Question question = questionRepository.findQuestionById(questionId);
        
        List<Answer> answersToDelete = question.getAnswers();
        answerRepository.deleteAll(answersToDelete);

        template.removeQuestion(question);
        questionRepository.delete(question);
        formTemplateRepository.save(template);

        return question;
    }

}
