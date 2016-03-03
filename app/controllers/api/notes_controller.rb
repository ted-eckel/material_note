class Api::NotesController < ApplicationController
  def create
    @note = Note.new(note_params)
    @note.notebook_id = params[:notebook_id]
    @note.save!
  end

  def destroy
    @note = Note.find(params[:id])
    id = @note.id
    @note.destroy
    render json: id
  end

  def index
    if params[:notebook_id] != nil
      @notebook = Notebook.find(params[:notebook_id])
      @notes = @notebook.notes
    else
      @notes = current_user.notes
    end
    render json: @notes
    # @notes = Note.where(user_id: current_user.id).order(updated_at: :desc)
  end

  def show
  end

  def update
    @note = Note.find(params[:note][:id])
    @note.update(note_params)
    render json: @note
  end

  private
  def note_params
    params.require(:note).permit(:title, :body)
  end
end
