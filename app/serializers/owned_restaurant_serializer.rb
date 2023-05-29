class OwnedRestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :address, :phone, :price, :image_url
end
