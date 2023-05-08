class UserRestaurantSerializer < ActiveModel::Serializer
  attributes :name, :address, :phone, :image_url
end
