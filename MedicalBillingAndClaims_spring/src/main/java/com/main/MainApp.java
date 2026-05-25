package com.main;

import com.main.config.MainAppConfig;
import com.main.dao.UserDao;
import com.main.daoImpl.UserDaoImpl;
import com.main.enums.Role;
import com.main.exceptions.ResourceNotFoundException;
import com.main.model.User;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import javax.sql.DataSource;
import java.util.Scanner;

import static com.main.util.InputUtil.updateIfNotBlank;

public class MainApp {
    public static void main(String[] args) {
        Scanner s=new Scanner(System.in);
        AnnotationConfigApplicationContext context=new AnnotationConfigApplicationContext(MainAppConfig.class);
        UserDao userDao=context.getBean(UserDaoImpl.class);

        while(true){
            System.out.println("------------------------------");
            System.out.println("1.Insert User");
            System.out.println("2.View All Users");
            System.out.println("3.View User By Id");
            System.out.println("4.Delete User");
            System.out.println("5.Update User");
            System.out.println("0.Exit");
            System.out.println("------------------------------");
            System.out.print("Enter ------------->>> : ");
            int ch=s.nextInt();
            switch (ch){
                case 0:
                    s.close();
                    context.close();
                    return;

                case 1:
                    //insert user
                    s.nextLine();
                    try {
                        User user = new User();
                        System.out.println("Enter Full Name : ");
                        user.setFullName(s.nextLine());
                        System.out.println("Enter Username : ");
                        user.setUsername(s.nextLine());
                        System.out.println("Enter Email : ");
                        user.setEmail(s.nextLine());
                        System.out.println("Enter Password : ");
                        user.setPassword(s.nextLine());
                        System.out.println("Enter phone number : ");
                        user.setPhoneNumber(s.nextLine());
                        System.out.println("Enter Role : ");
                        user.setRole(Role.valueOf(s.nextLine().replace(" ", "_").toUpperCase()));

                        userDao.insert(user);
                        System.out.println("User Added Successfully....");
                        System.out.println("------------------------------");
                    }
                    catch (RuntimeException e){
                        System.out.println("Invalid Data");
                    }
                    break;

                case 2:
                    //get all users

                    userDao.getAll().forEach(System.out::println);
                    System.out.println("------------------------------");
                    break;

                case 3:
                    //get user by id
                    try {
                    System.out.println("Enter the Id to view User :");
                    int id=s.nextInt();
                        User user=userDao.getById(id);
                        System.out.println(user);
                        System.out.println("------------------------------");
                    }
                    catch (RuntimeException e){
                        System.out.println("Invalid ID");
                    }
                    break;

                case 4:
                    //delete user
                    try {
                    System.out.println("Enter User id to be deleted : ");
                    int id = s.nextInt();
                    userDao.deleteById(id);
                        System.out.println("User Deleted Successfully....");
                        System.out.println("------------------------------");
                    }
                    catch (ResourceNotFoundException e){
                        System.out.println(e.getMessage());
                    }
                    break;

                case 5:
                    //update user
                    try{
                    System.out.println("Enter id to Update User : ");
                    int id=s.nextInt();
                    User user=userDao.getById(id);
                    System.out.println("Existing User Record : ");
                    System.out.println(user);
                    s.nextLine();

                    System.out.print("Enter new full name : ");
                    user.setFullName(updateIfNotBlank(user.getFullName(),s.nextLine()));

                    System.out.print("Enter new username : ");
                    user.setUsername(updateIfNotBlank(user.getUsername(),s.nextLine()));

                    System.out.print("Enter new email : ");
                    user.setEmail(updateIfNotBlank(user.getEmail(),s.nextLine()));

                    System.out.print("Enter new password : ");
                    user.setPassword(updateIfNotBlank(user.getPassword(),s.nextLine()));

                    System.out.print("Enter new phone number : ");
                    user.setPhoneNumber(updateIfNotBlank(user.getPhoneNumber(),s.nextLine()));

                    System.out.print("Enter new role : ");
                    String role = s.nextLine();

                    if (!role.isBlank()) {
                        user.setRole(Role.valueOf(role.replace(" ", "_").toUpperCase()));
                    }

                    userDao.update(user,id);

                        System.out.println("User Updated Successfully....");
                        System.out.println("------------------------------");
                    }
                    catch (RuntimeException e){
                        System.out.println("Invalid id for Update");
                    }
                    break;
            }
        }




    }
}
