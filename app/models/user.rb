class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_many :ownerships, dependent: :destroy
  has_many :reservations, dependent: :destroy
  has_many :owned_restaurants, through: :ownerships, source: :restaurant
  has_many :restaurants, through: :reservations
end
