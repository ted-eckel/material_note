class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.integer :notebook_id, null: false
      t.boolean :archived, null: false, default: false

      t.timestamps null: false
    end
    add_index :notes, :notebook_id
  end
end
