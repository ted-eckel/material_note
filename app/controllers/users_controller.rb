class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      @user.notebooks.create(title: "Your First Notebook!", description: nil).notes.create(title: "Your First Note!", body: "<div>This is a note. You can find notes within their notebooks. In order to create a note, click the floating action button on the bottom-right, and give your note a title and a body. Notes can be edited by clicking them in the sidebar menu, in their respective notebook. In order to create a notebook, hover over the floating action button on the bottom-right, and click the notebook icon. Then give your notebook a title!</div><div><br></div><div><br></div><div>Check out my: </div><div><a href=\"https://github.com/ted-eckel\"><span style=\"color: rgb(17, 85, 204); font-family: arial, sans-serif; font-size: small;\">GitHub</span></a><span style=\"color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: small;\">&nbsp;-&nbsp;</span><a href=\"https://www.linkedin.com/in/tedjeckel\"><span style=\"color: rgb(17, 85, 204); font-family: arial, sans-serif; font-size: small;\">LinkedIn</span></a><span style=\"color: rgb(34, 34, 34); font-family: arial, sans-serif; font-size: small;\">&nbsp;-&nbsp;</span><a href=\"http://tedeckel.me/\"><span style=\"color: rgb(17, 85, 204); font-family: arial, sans-serif; font-size: small;\">Portfolio</span></a></div>")
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end
end
