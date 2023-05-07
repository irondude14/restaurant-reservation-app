class RemoveDateAndTimeFromReservations < ActiveRecord::Migration[6.1]
  def change
    remove_column :reservations, :date, :string
    remove_column :reservations, :time, :string
  end
end
