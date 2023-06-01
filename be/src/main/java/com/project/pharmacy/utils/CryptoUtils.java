package com.project.pharmacy.utils;

import org.springframework.stereotype.Component;


import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.Cipher;
import java.util.Base64;

@Component
public class CryptoUtils {

    public String decrypted(String text) {
        try {
            String key = "1234567812345678";
            String iv = "1234567812345678";

            Base64.Decoder decoder = Base64.getDecoder();
            byte[] encrypted1 = decoder.decode(text);

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.DECRYPT_MODE, keyspec, ivspec);

            byte[] original = cipher.doFinal(encrypted1);
            String originalString = new String(original);
            return originalString.trim();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public String encrypted(String text) {
        try {
            String key = "1234567812345678";
            String iv = "1234567812345678";

            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keyspec = new SecretKeySpec(key.getBytes(), "AES");
            IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
            cipher.init(Cipher.ENCRYPT_MODE, keyspec, ivspec);

            byte[] encrypted = cipher.doFinal(text.getBytes());
            Base64.Encoder encoder = Base64.getEncoder();
            String encryptedString = encoder.encodeToString(encrypted);
            return encryptedString;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
