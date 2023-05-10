class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :price, :image_url, :owner_id

  has_many :reservations, serializer: ReservationSerializer
  # has_many :users, through: :reservations, serializer: UserSerializer
end
