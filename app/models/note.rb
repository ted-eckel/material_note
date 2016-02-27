class Note < ActiveRecord::Base
  belongs_to :notebook

  has_one :user,
  through: :notebooks,
  source: :user 
end
