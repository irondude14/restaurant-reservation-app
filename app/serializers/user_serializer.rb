class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password

  has_many :reservations, serializer: ReservationSerializer
  has_many :restaurants, serializer: UserRestaurantSerializer
end
