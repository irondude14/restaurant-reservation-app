class OwnerSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_hash
end
