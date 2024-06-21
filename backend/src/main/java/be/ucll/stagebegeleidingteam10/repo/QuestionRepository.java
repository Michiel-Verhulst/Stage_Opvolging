package be.ucll.stagebegeleidingteam10.repo;

import be.ucll.stagebegeleidingteam10.model.FormTemplate;
import org.hibernate.sql.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import be.ucll.stagebegeleidingteam10.model.Question;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findQuestionByTemplate(FormTemplate template);
    Question findQuestionById(long id);
}
