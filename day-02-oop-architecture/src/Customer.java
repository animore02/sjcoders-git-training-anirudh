public class Customer extends User {

    public Customer(int id, String name) {
        super(id, name);
    }

    @Override
    public void displayRole() {
        System.out.println("Role: Customer");
    }

    @Override
    public String toString() {
        return "Customer{id=" + getId()
                + ", name='" + getName() + "'}";
    }
}