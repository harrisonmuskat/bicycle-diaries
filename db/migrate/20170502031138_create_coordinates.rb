class CreateCoordinates < ActiveRecord::Migration[5.0]
  def change
    create_table :coordinates do |t|
      t.belongs_to :ride, null: false
      t.decimal :start_latitude
      t.decimal :start_longitude
      t.decimal :end_latitude
      t.decimal :end_longitude

      t.timestamps
    end
  end
end
