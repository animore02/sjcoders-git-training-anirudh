import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
// import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        // created customers
        Customer customer1 = new Customer(1, "Rahul");
        Customer customer2 = new Customer(2, "Priya");
        Customer customer3 = new Customer(3, "Amit");

        // 
        System.out.println("---- CUSTOMER ROLES ---");

        customer1.displayRole();
        customer2.displayRole();
        customer3.displayRole();

        
        // list of services
        Service service1 = new Service(101, "Haircut", 300);
        Service service2 = new Service(102, "Massage", 800);
        Service service3 = new Service(103, "Facial", 500);

       
        // booking of services
        Booking booking1 = new Booking(
                1001,
                customer1,
                service1,
                "CONFIRMED"
        );

        Booking booking2 = new Booking(
                1002,
                customer2,
                service2,
                "CONFIRMED"
        );

        Booking booking3 = new Booking(
                1003,
                customer3,
                service3,
                "PENDING"
        );

      

        ArrayList<Booking> bookings = new ArrayList<>();

        bookings.add(booking1);
        bookings.add(booking2);
        bookings.add(booking3);

        System.out.println("\n----- ALL BOOKINGS -----");

        for (Booking booking : bookings) {
            System.out.println(booking);
        }

       
        // HashSet
        HashSet<String> serviceNames = new HashSet<>();

        serviceNames.add("Haircut");
        serviceNames.add("Massage");
        serviceNames.add("Facial");
        serviceNames.add("Haircut"); // Duplicate: it avoided by set

        System.out.println("\n----- UNIQUE SERVICES -----");

        for (String service : serviceNames) {
            System.out.println(service);
        }

       
        // Map
        HashMap<Integer, Booking> bookingById = new HashMap<>();

        bookingById.put(1001, booking1);
        bookingById.put(1002, booking2);
        bookingById.put(1003, booking3);


        System.out.println("\n----- SEARCH BOOKING -----");
        
        // Scanner sc = new Scanner(System.in);
        // int searchId = sc.nextInt();

        int searchId = 1002;

        Booking foundBooking = bookingById.get(searchId);

        if (foundBooking != null) {
            System.out.println("Booking found:");
            System.out.println(foundBooking);
        } else {
            System.out.println("Booking not found.");
        }
    }
}