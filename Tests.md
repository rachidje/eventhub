## Tests unitaires

### Usecase: Create Event
- [x] Should fail if similar event already exists
- [x] Should fail if the event dates is in the past
- [x] Should fail if the event is too soon (3 days minimum)
- [x] Should fail if the event is too long (> 3 hours)
- [x] Should fail if capacity is negative
- [x] Should fail if capacity is lower than 10
- [x] Should fail if capacity is higher than 100
- [x] Should fail if dates are not in opening hours of the place
- [x] Should fail if the place is not available
- [x] Should fail if the price is negative
- [x] Should book the place
- [x] Should return the event ID
- [x] Should insert the event in the database