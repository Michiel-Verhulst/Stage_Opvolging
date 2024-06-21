package be.ucll.stagebegeleidingteam10.repo;

import be.ucll.stagebegeleidingteam10.model.OPO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OPORepository extends JpaRepository<OPO, String> {

    OPO findOPOByCode(String code);

}
