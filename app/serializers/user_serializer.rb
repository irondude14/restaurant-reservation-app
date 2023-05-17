class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone, :password

  has_many :reservations, serializer: ReservationSerializer
  has_many :restaurants, serializer: UserRestaurantSerializer
end
