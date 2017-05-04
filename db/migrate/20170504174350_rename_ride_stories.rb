class RenameRideStories < ActiveRecord::Migration[5.0]
  def up
    rename_table :ride_stories, :stories
  end

  def down
    rename_table :stories, :ride_stories
  end
end
