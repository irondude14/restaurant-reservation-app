class DeleteOwnerIdColumnFromRestaurants < ActiveRecord::Migration[6.1]
  def change
    remove_column :restaurants, :owner_id
  end
end
