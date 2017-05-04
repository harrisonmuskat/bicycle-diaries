# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170504174350) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "coordinates", force: :cascade do |t|
    t.integer  "ride_id",         null: false
    t.decimal  "start_latitude"
    t.decimal  "start_longitude"
    t.decimal  "end_latitude"
    t.decimal  "end_longitude"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["ride_id"], name: "index_coordinates_on_ride_id", using: :btree
  end

  create_table "maps", force: :cascade do |t|
    t.integer "ride_id"
    t.string  "map_id"
    t.string  "polyline"
    t.string  "summary_polyline"
    t.index ["ride_id"], name: "index_maps_on_ride_id", using: :btree
  end

  create_table "rides", force: :cascade do |t|
    t.integer  "user_id",                 null: false
    t.integer  "ride_id",                 null: false
    t.string   "name"
    t.string   "description"
    t.float    "distance"
    t.integer  "moving_time_in_seconds"
    t.integer  "elapsed_time_in_seconds"
    t.float    "total_elevation_gain"
    t.string   "type",                    null: false
    t.datetime "start_date",              null: false
    t.float    "average_speed"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["user_id"], name: "index_rides_on_user_id", using: :btree
  end

  create_table "stories", force: :cascade do |t|
    t.integer  "ride_id"
    t.string   "title",      null: false
    t.text     "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ride_id"], name: "index_stories_on_ride_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string  "access_token", null: false
    t.string  "provider",     null: false
    t.integer "uid",          null: false
    t.string  "email",        null: false
    t.string  "firstname"
    t.string  "lastname"
    t.string  "profile"
    t.string  "city"
    t.string  "state"
    t.string  "country"
  end

end
