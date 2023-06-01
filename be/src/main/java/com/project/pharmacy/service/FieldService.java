package com.project.pharmacy.service;

import com.project.pharmacy.entity.Field;
import com.project.pharmacy.repository.FieldRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FieldService {
    @Autowired
    FieldRepository fieldRepository;

    public List<Field> findFields() {
        return fieldRepository.findAll();
    }
}
