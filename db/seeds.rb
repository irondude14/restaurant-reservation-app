# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding database...'

require 'bcrypt'

owner_pass_1 = BCrypt::Password.create('123')
Owner.create(
  name: 'Arthur Bucco',
  email: 'burnedrabbit@hotmail.com',
  password_hash: owner_pass_1,
)

user_pass_1 = BCrypt::Password.create('123')
User.create(
  name: 'Kevin Smith',
  email: 'silguybehindquickstop@gmail.com',
  password_hash: user_pass_1,
)

Restaurant.create(
  name: 'Vesuvio',
  address: '2 1st St, Elizabeth, NJ 07206',
  phone: '+19084335050',
  price: 3,
  image_url:
    'https://pbs.twimg.com/media/FAjXILrWQAQV_zU?format=jpg&name=medium',
  owner_id: 1,
)

puts 'Done seeding.'
