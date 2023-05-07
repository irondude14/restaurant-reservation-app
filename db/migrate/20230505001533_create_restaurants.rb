class CreateRestaurants < ActiveRecord::Migration[6.1]
  def change
    create_table :restaurants do |t|
      t.string :name
      t.string :address
      t.string :phone
      t.integer :price
      t.string :image_url
      t.integer :owner_id

      t.timestamps
    end
  end
end
