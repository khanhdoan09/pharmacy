package com.project.pharmacy.utils;

import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.crypto.Cipher;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class CryptoUtils {
    public String decrypted(String text) {
        try {
            String key = "1234567812345678";
            String iv = "1234567812345678";

            Base64.Decoder decoder = Base64.getDecoder();
            byte[] encrypted1 = decoder.decode(text);

            Cipher cipher = Cipher.getInstance("AES/CBC/NoPadding");
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


    public static void main(String[] args) throws Exception {
        CryptoUtils cryptoUtils = new CryptoUtils();
        System.out.println(cryptoUtils.decrypted("h/fncYObsxBMhhOlNn9uRg=="));
    }
}
