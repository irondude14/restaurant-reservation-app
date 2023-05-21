class UserRestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :image_url
end
