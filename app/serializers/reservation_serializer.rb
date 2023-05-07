class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :restaurant_id, :date, :time, :guest_number
end
