class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password

  has_many :restaurants, serializer: RestaurantSerializer
end
