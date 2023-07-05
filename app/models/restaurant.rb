class Restaurant < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true
  validates :phone,
            presence: true,
            format: {
              with: /\A\+?\d{10,11}\z/,
              message: 'is invalid',
            }
  validates :price,
            presence: true,
            numericality: {
              only_integer: true,
              greater_than_or_equal_to: 1,
              less_than_or_equal_to: 5,
              message: 'only allows whole numbers',
            }
  validates :image_url, presence: true
  validates :description, presence: true

  has_many :ownerships
  has_many :owners, through: :ownerships, source: :user
  has_many :reservations, dependent: :destroy
  has_many :users, through: :reservations
end
