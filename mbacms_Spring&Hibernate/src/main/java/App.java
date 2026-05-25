import com.app.config.AppConfig;
import com.app.dao.AuthDao;
import com.app.dao.InsuranceCompanyDao;
import com.app.dao.InsurancePlanDao;
import com.app.daoImpl.AuthDaoImpl;
import com.app.enums.ActiveStatus;
import com.app.enums.PlanType;
import com.app.exception.ResourceNotFoundException;
import com.app.model.InsuranceCompany;
import com.app.model.InsurancePlan;
import com.app.model.User;
import jakarta.persistence.NoResultException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;
import java.util.Scanner;

public class App {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context=new AnnotationConfigApplicationContext(AppConfig.class);

        AuthDao authDao=context.getBean(AuthDaoImpl.class);
        InsurancePlanDao planDao=context.getBean(InsurancePlanDao.class);
        InsuranceCompanyDao companyDao=context.getBean(InsuranceCompanyDao.class);
        Scanner s=new Scanner(System.in);
        System.out.println("Enter username : ");
        String username=s.next();
        System.out.println("Enter password : ");
        String password=s.next();

        try{
            User user =authDao.login(username,password);

            switch (user.getRole().name()){
                case "INSURANCE_COMPANY":
                    System.out.println("Insurance Company Menu : WELCOME "+user.getFullName());

                    while(true){
                        System.out.println("1. View Company Profile");
                        System.out.println("2. Add Insurance Plan");
                        System.out.println("3. View Insurance Plans");
                        System.out.println("4. Update Insurance Plan");
                        System.out.println("5. Delete Insurance Plan");
                        System.out.println("0. Exit");

                        int ch=s.nextInt();
                        if (ch == 0)
                            break;

                        InsuranceCompany company = companyDao.viewProfile(user.getId());
                        switch (ch){
                            case 1:
                                try{
                                    System.out.println(company);
                                }
                                catch (NoResultException e) {
                                    System.out.println("Company not found!");
                                }

                                break;

                            case 2:
                                InsurancePlan insurancePlan=new InsurancePlan();
                                s.nextLine();
                                System.out.println("Plan Name: ");
                                insurancePlan.setPlanName(s.nextLine());
                                System.out.println("Plan Type (INDIVIDUAL/FAMILY/SENIOR_CITIZEN/CORPORATE): ");
                                insurancePlan.setPlanType(PlanType.valueOf(s.nextLine().toUpperCase()));
                                System.out.println("Plan Description: ");
                                insurancePlan.setPlanDesc(s.nextLine());
                                System.out.println("Coverage Amount: ");
                                insurancePlan.setCoverageAmount(s.nextBigDecimal());
                                System.out.println("Premium Amount: ");
                                insurancePlan.setPremiumAmount(s.nextBigDecimal());
                                System.out.println("Duration Months: ");
                                insurancePlan.setDurationMonths(s.nextInt());
                                System.out.println("Active Status (ACTIVE/INACTIVE): ");
                                insurancePlan.setActiveStatus(ActiveStatus.valueOf(s.next().toUpperCase()));

                                planDao.addPlan(insurancePlan, company.getId());
                                System.out.println("Plan Added successfully......");

                                break;

                            case 3:
                                System.out.println("----------Insurance Plans created by : "+user.getFullName()+" ----------");
                                List<InsurancePlan> planList=planDao.viewAllPlans(company.getId());
                                planList.forEach(System.out::println);
                                break;

                            case 4:

                                try {
                                    System.out.println("Enter Plan id to update: ");
                                    int id = s.nextInt();
                                InsurancePlan exPlan=planDao.getById(id);
                                System.out.println(exPlan);
                                    s.nextLine();
                                    insurancePlan = new InsurancePlan();
                                    System.out.println("Plan Name:");
                                    insurancePlan.setPlanName(s.nextLine());
                                    System.out.println("Plan Type (INDIVIDUAL/FAMILY/SENIOR_CITIZEN/CORPORATE): ");
                                    insurancePlan.setPlanType(PlanType.valueOf(s.nextLine().toUpperCase()));
                                    System.out.println("New Plan Description:");
                                    insurancePlan.setPlanDesc(s.nextLine());
                                    System.out.println("New Coverage Amount:");
                                    insurancePlan.setCoverageAmount(s.nextBigDecimal());
                                    System.out.println("New Premium Amount:");
                                    insurancePlan.setPremiumAmount(s.nextBigDecimal());
                                    System.out.println("New Duration Months: ");
                                    insurancePlan.setDurationMonths(s.nextInt());
                                    System.out.println("Active Status (ACTIVE/INACTIVE): ");
                                    insurancePlan.setActiveStatus(ActiveStatus.valueOf(s.next().toUpperCase()));

                                    planDao.update(insurancePlan, id);
                                    System.out.println("Plan Updated successfully.....");
                                }
                                catch (ResourceNotFoundException e){
                                    System.out.println(e.getMessage());
                                }
                                break;

                            case 5:

                                try {
                                    System.out.println("Enter Plan id to delete:");
                                    int id = s.nextInt();
                                    planDao.delete(id);
                                    System.out.println("Plan deleted successfully.....");
                                }
                                catch (ResourceNotFoundException e) {
                                    System.out.println(e.getMessage());
                                }
                                break;
                        }
                    }
            }
        }
        catch (NoResultException e){
            System.out.println("Invalid data");
        }


        s.close();
        context.close();

    }

}
