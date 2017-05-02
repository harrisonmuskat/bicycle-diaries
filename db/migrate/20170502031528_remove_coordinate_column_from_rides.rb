class RemoveCoordinateColumnFromRides < ActiveRecord::Migration[5.0]
  def change
    remove_column :rides, :coordinate_id
  end
end
