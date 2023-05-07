class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone, :price, :image_url, :owner_id
end
