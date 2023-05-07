class CreateOwners < ActiveRecord::Migration[6.1]
  def change
    create_table :owners do |t|
      t.string :name
      t.string :email
      t.string :password_hash

      t.timestamps
    end
  end
end
