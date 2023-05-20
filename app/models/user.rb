class User < ApplicationRecord
  has_secure_password
  validates :name, :password, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_many :reservations
  has_many :restaurants, through: :reservations
end
