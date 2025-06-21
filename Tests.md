## Tests unitaires

### Usecase: Create Event
- [x] Should fail if similar event already exists
- [x] Should fail if the event dates is in the past
- [x] Should fail if the event is too soon (3 days minimum)
- [x] Should fail if the event is too long (> 3 hours)
- [ ] SHould fail if dates are not in working hours
- [ ] Should fail if capacity is negative
- [ ] Should fail if capacity is 0
- [ ] Should fail if capacity is > 100
- [ ] Should fail if the place is already taken
- [ ] Should fail if the price is negative