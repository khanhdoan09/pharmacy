package com.project.pharmacy.service;

import com.project.pharmacy.entity.Likes;
import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.Saved;
import com.project.pharmacy.entity.User;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.MedicineRepository;
import com.project.pharmacy.repository.SavedRepository;
import com.project.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SavedService {
    @Autowired
    SavedRepository savedRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    MedicineRepository medicineRepository;

    public List<Saved> findAllSaved() {
        return savedRepository.findAll();
    }

    public Saved findByEmailAndMedicineId(String email, int medicineId) throws CustomException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find user by email = " + email);
        } else {
            Saved saved = savedRepository.findByUserIdAndMedicineId(user.getId(), medicineId);
            return saved;
        }
    }

    public List<Saved> findSavedByEmail(String email) throws CustomException {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find user");
        } else {
            List<Saved> savedList =
                    savedRepository.findAll().stream().filter(x -> x.getUser().getId() == user.getId()).collect(Collectors.toList());
            if (savedList.size() == 0) {
                throw new CustomException(HttpStatus.NOT_FOUND, "Can't find save by email = " + email);
            }
            return savedList;
        }
    }

    public void saveNewSaved(String email, int medicineId) throws CustomException {
        User user =
                userRepository.findAll().stream().filter(u -> u.getEmail().equals(email.trim())).findFirst().orElse(null);
        Medicine medicine = medicineRepository.findById(medicineId).orElse(null);

        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "You need register account to use save medicine function");
        } else if (medicine == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "Can't find medicine by id = " + medicine);
        } else {
            Saved saved = savedRepository.findByUserIdAndMedicineId(user.getId(), medicineId);
            if (saved != null) {
                throw new CustomException(HttpStatus.CONFLICT, "You already save this medicine");
            } else {
                DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
                Calendar cal = Calendar.getInstance();
                Saved newSave = new Saved(0L, user.getId(), medicine.getId(), LocalDateTime.now());
                savedRepository.save(newSave);
            }
        }
    }

    public void unSave(String email, int medicineId) throws CustomException {
        User user =
                userRepository.findAll().stream().filter(u -> u.getEmail().equals(email.trim())).findFirst().get();
        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "You need register account to use un save medicine " +
                    "function");
        } else {
            Saved saved = savedRepository.findByUserIdAndMedicineId(user.getId(), medicineId);
            if (saved == null) {
                throw new CustomException(HttpStatus.NOT_FOUND, "Can't save by user id and medicine id");
            } else {
                savedRepository.delete(saved);
            }
        }
    }
}
