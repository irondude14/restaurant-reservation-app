class Reservation < ApplicationRecord
  validates :name, presence: true
  validates :date_time, presence: true
  validates :guest_number, presence: true
  
  belongs_to :user
  belongs_to :restaurant
end
