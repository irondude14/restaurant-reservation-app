class AddNotNullConstraintsToOwners < ActiveRecord::Migration[6.1]
  def change
    change_column_null :owners, :name, false
    change_column_null :owners, :email, false
  end
end
