class AddUserColumnToStories < ActiveRecord::Migration[5.0]
  def up
    add_column :stories, :user_id, :integer, index: true
  end

  def down
    remove_column :stories, :user_id
  end
end
