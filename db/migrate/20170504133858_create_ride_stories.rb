class CreateRideStories < ActiveRecord::Migration[5.0]
  def change
    create_table :ride_stories do |t|
      t.belongs_to :ride
      t.string :title, null: false
      t.text :body, null: false

      t.timestamps
    end
  end
end
