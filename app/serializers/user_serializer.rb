class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password

  has_many :reservations, serializer: ReservationSerializer
  has_many :restaurants, serializer: UserRestaurantSerializer
  has_many :owned_restaurants,
           through: :ownerships,
           source: :restaurant,
           serializer: OwnedRestaurantSerializer
end
