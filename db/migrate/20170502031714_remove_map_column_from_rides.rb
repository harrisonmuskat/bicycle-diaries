class RemoveMapColumnFromRides < ActiveRecord::Migration[5.0]
  def change
    remove_column :rides, :map_id
  end
end
