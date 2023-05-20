class Owner < ApplicationRecord
  has_secure_password
  validates :name, :password, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_many :restaurants
end
