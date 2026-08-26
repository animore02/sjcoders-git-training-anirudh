# Application Architecture

Right now, this project is only run in Java console application for creating and
managing bookings. If we turn it into a real web application, the flow
would look like this:

Frontend → REST API → Backend → Database → Response

## 1. Frontend

The user would see a booking form on the frontend.

They could enter things like:

- Customer ID : to confirm booking if ID is available & if ID is not availabe then need to generate ID or need to Register
- Service ID : to choose service 
- Booking date : to book appoiment

The frontend could be made using HTML, CSS and JavaScript or React.

## 2. REST API

After the user submits the form, the frontend sends the booking details to the backend using an API.

For example:

POST /api/bookings

The request could contain:

{
    "customerId": 1,
    "serviceId": 101,
    "date": "2026-08-26"
}

## 3. Backend

The backend receives the request and checks the details before creating the booking.

It would check:

- Whether the customer exists
- Whether the service exists
- Whether the date is valid
- Whether the booking can be created

After the checks are completed, the backend creates the booking and saves it.

A Java backend could be made using Spring Boot.

## 4. Database

The booking details would be stored in a database.

For example, the database could contain:

- Customer ID
- Customer name
- Service ID
- Service name
- Service price
- Booking ID
- Booking date
- Booking status

MySQL or PostgreSQL could be used for this.

## 5. Response

After the booking is created, the backend sends the result back to the
frontend.

For example:

{
    "bookingId": 1001,
    "status": "CONFIRMED"
}

The frontend can then show the booking confirmation to the user.

## Simple Flow

1. User enters booking details on the frontend.
2. Frontend sends the details to the API.
3. Backend checks the details.
4. Backend saves the booking in the database.
5. Backend sends the result back.
6. Frontend displays the booking confirmation.