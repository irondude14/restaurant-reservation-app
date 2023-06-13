class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :description, :phone, :price, :image_url

  has_many :reservations
end
