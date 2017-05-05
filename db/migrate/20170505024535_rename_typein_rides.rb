class RenameTypeinRides < ActiveRecord::Migration[5.0]
  def up
    rename_column :rides, :type, :ride_type
  end

  def down
    rename_column :rides, :ride_type, :type
  end
end
