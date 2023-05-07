class User < ApplicationRecord
    has_secure_password
    has_many :reservations
    has_mnay :restaurants, through :reservations
end
