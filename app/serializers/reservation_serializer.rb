class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :restaurant_id, :name, :date_time, :guest_number, :restaurant
end
