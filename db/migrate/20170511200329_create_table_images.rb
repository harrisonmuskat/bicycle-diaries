class CreateTableImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.belongs_to :story
      t.string :image_url, null: false

      t.timestamps
    end
  end
end
