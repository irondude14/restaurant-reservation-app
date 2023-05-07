class AddDatetimeToReservations < ActiveRecord::Migration[6.1]
  def change
    add_column :reservations, :date_time, :datetime
  end
end
