package com.project.pharmacy.service;

import com.project.pharmacy.entity.Cart;
import com.project.pharmacy.entity.Medicine;
import com.project.pharmacy.entity.Unit;
import com.project.pharmacy.exception.CustomException;
import com.project.pharmacy.repository.CartRepository;
import com.project.pharmacy.repository.MedicineRepository;
import com.project.pharmacy.repository.UnitRepository;
import com.project.pharmacy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Autowired
    private UnitService unitService;

    public List<Cart> findMedicinesInCart(int userId) throws CustomException {
        if (userId < 1) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "parameter must be greater than 0");
        }
        List<Cart> carts = cartRepository.findByUserId(userId);
        if (carts.isEmpty()) {
            throw new CustomException(HttpStatus.NOT_FOUND, "no medicine was not found in cart by user id");
        }
        return carts;
    }

    public void addNewMedicineToCart(Cart cart) throws CustomException {
        checkValidityIdOfUserIdAndMedicineId(cart.getUserId(), cart.getMedicine().getId());
        cartRepository.save(cart);
    }

    private void checkValidityIdOfUserIdAndMedicineId(int userId, int medicineId) throws CustomException {
        if (userId < 1 || medicineId < 1) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "parameters must be greater than 0");
        }
        if (!userRepository.findById(userId).isPresent()) {
            throw new CustomException(
                    HttpStatus.NOT_FOUND,
                    "server cannot add a medicine to cart because of user id is not found");
        }
        Optional<Medicine> medicine = medicineRepository.findById(medicineId);
        if (!medicine.isPresent()) {
            throw new CustomException(
                    HttpStatus.NOT_FOUND,
                    "server cannot add a medicine to cart because of medicine id is not found");
        }
        if (medicine.get().getActive() == 0) {
            throw new CustomException(HttpStatus.GONE, "server cannot update this medicine to cart because of this " +
                    "medicine id is not active anymore");
        }
    }

    public void updateMedicineQuantityInCart(int id, int quantity) throws CustomException {
        if (id < 1 || quantity < 1) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "parameters must be greater than 0");
        }
        Optional<Cart> cart = cartRepository.findById(id);
        if (!cart.isPresent()) {
            throw new CustomException(HttpStatus.NOT_FOUND, "id cart was not found");
        }
        cart.get().setQuantity(quantity);
        cartRepository.save(cart.get());
    }

    public void updateUnit(int cartId, int unitId) throws CustomException {
        if (cartId < 1 || unitId < 1) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "parameters must be greater than 0");
        }
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (!cart.isPresent()) {
            throw new CustomException(HttpStatus.NOT_FOUND, "cart id was not found");
        }
        Optional<Unit> unit = unitRepository.findById(unitId);
        if (!unit.isPresent()) {
            throw new CustomException(HttpStatus.NOT_FOUND, "unit id was not found");
        }
        int quantity = calculateQuantityByUnitLevel(cart.get().getMedicine().getId(), unit.get().getLevel()) * cart.get().getQuantity();
        checkMedicineQuantityForSale(cart.get().getMedicine(), quantity);
        cart.get().setUnit(unit.get());
        cartRepository.save(cart.get());
    }

    public int calculateQuantityByUnitLevel(int medicineId, int level) throws CustomException {
        List<Unit> units = unitService.findAllUnitsInAMedicine(medicineId);
        int result = 1;
        for (Unit u : units) {
            if (level == 0) {
                return result;
            }
            result *= u.getQuantity();
            if (u.getLevel() == level) {
                return result;
            }
        }
        return result;
    }
    public void deleteAMedicineToCart(int id) throws CustomException {
        if (id < 1) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "parameters must be greater than 0");
        }
        if (!cartRepository.findById(id).isPresent()) {
            throw new CustomException(HttpStatus.NOT_FOUND, "no medicine was not found in cart by id");
        }
        cartRepository.deleteById(id);
    }

    public void checkMedicineQuantityForSale(Medicine medicine, int quantityForSale) throws CustomException {
        if (medicine.getActive() == 0) {
            throw new CustomException(HttpStatus.GONE, "server cannot update this medicine to cart because of " +
                    "this " +
                    "medicine id is not active anymore");
        }
        if (medicine.getTotalNumber() < quantityForSale + medicine.getSaleNumber()) {
            throw new CustomException(HttpStatus.PAYLOAD_TOO_LARGE, "this medicine is not enough to order on " +
                    "request");
        }
    }

    public Medicine getMedicineByCartId(int cartId) throws CustomException {
        Optional<Cart> cart = cartRepository.findById(cartId);
        if (cart.isPresent()) {
            return cart.get().getMedicine();
        } else {
            throw new CustomException(HttpStatus.NOT_FOUND, "medicine id was not found");
        }
    }

    public Optional<Cart> findByMedicineIdAndUserId(int medicineId, int userId) {
        return cartRepository.findByMedicineIdAndUserId(medicineId, userId);
    }

    public void updateCart(Cart cart) {
        cartRepository.save(cart);
    }
}
