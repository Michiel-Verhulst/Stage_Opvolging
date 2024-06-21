package be.ucll.stagebegeleidingteam10.repo;

import be.ucll.stagebegeleidingteam10.model.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {

}
