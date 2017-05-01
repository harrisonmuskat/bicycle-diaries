class CreateUsersTable < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :access_token, null: false
      t.string :provider, null: false
      t.integer :uid, null: false
      t.string :email, null: false
      t.string :firstname
      t.string :lastname
      t.string :profile
      t.string :city
      t.string :state
      t.string :country
    end
  end
end
