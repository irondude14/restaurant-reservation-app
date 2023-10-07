# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding database...'

# Users
kevin =
  User.create(name: 'Kevin Smith', email: 'ksmith@gmail.com', password: '123')

arthur =
  User.create(name: 'Arthur Bucco', email: 'abucco@gmail.com', password: '123')

# Restaurants
vesuvio =
  Restaurant.create(
    name: 'Vesuvio',
    address: '2 1st St, Elizabeth, NJ 07206',
    phone: '+19084335050',
    price: 3,
    image_url:
      'https://pbs.twimg.com/media/FAjXILrWQAQV_zU?format=jpg&name=medium',
    description: 'Classic Italian Restaurant',
  )

# Ownerships
Ownership.create(user: arthur, restaurant: vesuvio)

# Reservations
Reservation.create(
  user: kevin,
  restaurant: vesuvio,
  name: 'Kevin Smith',
  date_time: '2023-05-25 18:30',
  guest_number: 4,
)

Reservation.create(
  user: kevin,
  restaurant: vesuvio,
  name: 'Kevin Smith',
  date_time: '2023-05-25 18:30',
  guest_number: 4,
)

puts 'Done seeding.'
