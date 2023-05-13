class User < ApplicationRecord
  def password=(password)
    @password = password
    self.password_hash = BCrypt::Password.create(password)
  end

  # def authenticate(password)
  #   BCrypt::Password.new(self.password_hash) == password
  # end

  has_many :reservations
  has_many :restaurants, through: :reservations
end
