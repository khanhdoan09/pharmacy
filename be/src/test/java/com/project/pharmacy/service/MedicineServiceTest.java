//package com.project.pharmacy.service;
//
//import com.project.pharmacy.repository.MedicineRepostory;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.params.ParameterizedTest;
//import org.junit.jupiter.params.provider.ValueSource;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import java.util.List;
//
//import static org.hamcrest.CoreMatchers.instanceOf;
//import static org.hamcrest.MatcherAssert.assertThat;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//public class MedicineServiceTest {
//    @Autowired
//    private MedicineService medicineService;
//
//    @MockBean
//    private  MedicineRepostory medicineRepostory;
//
//    @ParameterizedTest
//    @DisplayName("test find medicine by name")
//    @ValueSource(strings = {"Cốm", "a"})
//    public void testSearch(String keyword) {
//            assertThat(medicineService.findByNameOrBrand(keyword), instanceOf(List.class));
//    }
//}
