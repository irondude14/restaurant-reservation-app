class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :phone
end
