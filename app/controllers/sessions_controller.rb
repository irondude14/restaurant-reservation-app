class SessionsController < ApplicationController
  # login

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  # logout

  def destroy
    session.clear
  end
end
