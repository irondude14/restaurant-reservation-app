class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email
  has_many :reservations
  has_many :restaurants, serializer: UserRestaurantSerializer
  has_many :owned_restaurants
end
