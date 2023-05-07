class Restaurant < ApplicationRecord
    belongs_to :owner
    has_many :reservations
    has_many :users, through :reservations
end
