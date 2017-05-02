class CreateTableRides < ActiveRecord::Migration[5.0]
  def change
    create_table :rides do |t|
      t.belongs_to :user, null: false
      t.belongs_to :coordinate, null: false
      t.belongs_to :map, null: false
      t.integer :ride_id, null: false
      t.string :name
      t.string :description
      t.float :distance
      t.integer :moving_time_in_seconds
      t.integer :elapsed_time_in_seconds
      t.float :total_elevation_gain
      t.string :type, null: false
      t.datetime :start_date, null: false
      t.float :average_speed
      
      t.timestamps
    end
  end
end
