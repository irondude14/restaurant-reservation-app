class CreateOwnerships < ActiveRecord::Migration[6.1]
  def change
    create_table :ownerships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :restaurant, null: false, foreign_key: true
      t.timestamps
    end
  end
end
