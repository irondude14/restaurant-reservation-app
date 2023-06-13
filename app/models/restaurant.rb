class Restaurant < ApplicationRecord
  has_many :ownerships
  has_many :owners, through: :ownerships, source: :user
  has_many :reservations, dependent: :destroy
  has_many :users, through: :reservations
end
