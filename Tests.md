## Tests unitaires

### Usecase: Create Event
- [x] Should fail if similar event already exists
- [x] Should fail if the event dates is in the past
- [x] Should fail if the event is too soon (3 days minimum)
- [x] Should fail if the event is too long (> 3 hours)
- [x] Should fail if capacity is negative
- [x] Should fail if capacity is lower than 10
- [x] Should fail if capacity is higher than 100
- [ ] Should fail if dates are not in opening hours of the place
- [ ] Should fail if the place is not available
- [ ] Should fail if the place is already taken
- [ ] Should fail if the price is negative
- [ ] Should return the event ID
- [ ] Should insert the event in the database