class Restaurant < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true
  validates :phone, presence: true, format: { with: /\A\+?\d+\z/, message: "only allows numbers" }
  validates :price, presence: true, numericality: { only_integer: true, message: "only allows whole numbers" }
  validates :image_url, presence: true
  validates :description, presence: true
  
  has_many :ownerships
  has_many :owners, through: :ownerships, source: :user
  has_many :reservations, dependent: :destroy
  has_many :users, through: :reservations
end
