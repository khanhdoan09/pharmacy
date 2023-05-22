package com.project.pharmacy.utils;

import com.project.pharmacy.exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Component
public class MailUtils {
    public void sendMail(String toEmail, String codeActive, String subject, String content) throws CustomException {
        String to = toEmail;
        String from = "cdw.pharmacy@gmail.com";
        String host = "smtp.gmail.com";
        Properties properties = System.getProperties();
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("cdw.pharmacy@gmail.com", "pyxklplpzeqbwoqn");
            }
        });
        try {
            MimeMessage message = new MimeMessage(session);
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            helper.setSubject(subject);
            helper.setText(content, true);
            Transport.send(message);
        } catch (MessagingException mex) {
            System.out.println(mex.getMessage());
            throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "error in server");
        }
    }
}
