package be.ucll.stagebegeleidingteam10.service;

import be.ucll.stagebegeleidingteam10.model.FormTemplate;
import be.ucll.stagebegeleidingteam10.model.OPO;
import be.ucll.stagebegeleidingteam10.repo.FormTemplateRepository;
import be.ucll.stagebegeleidingteam10.repo.OPORepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OPOService {

    @Autowired
    private OPORepository opoRepository;

    @Autowired
    private FormTemplateRepository formTemplateRepository;

    public List<OPO> getAllOPO() {
        return opoRepository.findAll();
    }

    public OPO createOPO(OPO opo) {
        if (opoRepository.findOPOByCode(opo.getCode()) != null)
            throw new ServiceException("error", "OPO already exists");
        return opoRepository.save(opo);
    }

    public OPO edit(OPO opo, String code) {
        OPO updatedOPO = opoRepository.findOPOByCode(code);
        if (updatedOPO == null)
            throw new ServiceException("error", "OPO not found");
        updatedOPO.setName(opo.getName());
        updatedOPO.setStudyCode(opo.getStudyCode());
        updatedOPO.setLoops(opo.getLoops());
        opoRepository.save(updatedOPO);
        return updatedOPO;
    }

    public OPO delete(String opoCode){
        OPO deletedOPO = opoRepository.findOPOByCode(opoCode);
        if (deletedOPO == null)
            throw new ServiceException("error", "OPO not found");

        List<FormTemplate> deletedOPOTemplates = formTemplateRepository.findFormTemplateByOPO(deletedOPO);
        for (FormTemplate template: deletedOPOTemplates) {
            template.setOPO(null);
            formTemplateRepository.save(template);
        }


        opoRepository.delete(deletedOPO);
        return deletedOPO;
    }

    public OPO getOPOByCode(String opoCode) {
        return opoRepository.findOPOByCode(opoCode);
    }
}
