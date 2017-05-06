class AddTimeStampsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_timestamps :users
  end
end
