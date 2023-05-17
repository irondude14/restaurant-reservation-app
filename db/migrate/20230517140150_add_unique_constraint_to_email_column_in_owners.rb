class AddUniqueConstraintToEmailColumnInOwners < ActiveRecord::Migration[6.1]
  def change
    add_index :owners, :email, unique: true
  end
end
