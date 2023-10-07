class CreateReservations < ActiveRecord::Migration[6.1]
  def change
    create_table :reservations do |t|
      t.references :user, foreign_key: true
      t.references :restaurant, foreign_key: true
      t.integer :guest_number
      t.string :name
      t.datetime :date_time
      t.timestamps
    end
  end
end
