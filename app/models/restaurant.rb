class Restaurant < ApplicationRecord
  has_many :ownerships, dependent: :destroy
  has_many :owners, through: :ownerships, source: :user
  has_many :users, through: :reservations

  has_many :reservations
end
