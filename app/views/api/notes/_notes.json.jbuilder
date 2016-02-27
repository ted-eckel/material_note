json.extract! note, :id, :title, :body, :updated_at
json.notebook note.notebook
json.user do
  # json.partial! 'api/users/users', user: note.author
  json.id note.notebook.user.id
  json.username note.username.username
  json.notebooks note.notebook.user.notebooks do |notebook|
    json.id notebook.id
    json.title notebook.title
  end
end
