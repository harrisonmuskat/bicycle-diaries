class CreateMaps < ActiveRecord::Migration[5.0]
  def change
    create_table :maps do |t|
      t.belongs_to :ride
      t.string :map_id
      t.string :polyline
      t.string :summary_polyline
    end
  end
end
