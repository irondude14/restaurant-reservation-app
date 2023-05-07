class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email

  has_many :restaurants, serializer: RestaurantSerializer
end
