package com.sapo.edu.common;

import com.sapo.edu.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PrepareAssociationData {

    @Autowired
    private ModelRepository modelRepository;

    // REQUIREMENT: id must be sequential and from 1 => count
    // call in main() to init data to db
    public void insertModelProductAssociation(Long modelCountInDatabase, Long productCountInDatabase) {
        for (int i = 1; i <= modelCountInDatabase; i++) {

        }
    }
}
