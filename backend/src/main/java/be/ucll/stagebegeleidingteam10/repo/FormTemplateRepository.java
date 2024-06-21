package be.ucll.stagebegeleidingteam10.repo;

import be.ucll.stagebegeleidingteam10.model.FormTemplate;
import be.ucll.stagebegeleidingteam10.model.OPO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormTemplateRepository extends JpaRepository<FormTemplate, Long> {
    List<FormTemplate> findFormTemplateByOPO(OPO opo);
    List<FormTemplate> findFormTemplateByActive(boolean active);


}
