public class Booking {

    private int bookingId;
    private Customer customer;
    private Service service;
    private String status;

    public Booking(int bookingId, Customer customer,
                   Service service, String status) {

        this.bookingId = bookingId;
        this.customer = customer;
        this.service = service;
        this.status = status;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "bookingId=" + bookingId +
                ", customer=" + customer.getName() +
                ", service=" + service.getName() +
                ", price=" + service.getPrice() +
                ", status='" + status + '\'' +
                '}';
    }
}