class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :restaurant_id, :date_time, :guest_number
  belongs_to :restaurant, serializer: UserRestaurantSerializer
  belongs_to :user, serializer: UserSerializer
end
