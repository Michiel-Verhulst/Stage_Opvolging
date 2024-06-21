package be.ucll.stagebegeleidingteam10.repo;

import be.ucll.stagebegeleidingteam10.model.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {
}
