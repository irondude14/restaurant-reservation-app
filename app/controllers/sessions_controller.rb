class SessionsController < ApplicationController
  def create
    if params[:user_type] == 'owner'
      owner = Owner.find_by(email: params[:email])

      if owner && owner.authenticate(params[:password])
        session[:owner_id] = owner.id
        render json: { message: 'Owner logged in successfully', owner: owner }
      else
        render json: {
                 error: 'Invalid email or password',
               },
               status: :unauthorized
      end
    elsif params[:user_type] == 'user'
      user = User.find_by(email: params[:email])

      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: { message: 'User logged in successfully', user: user }
      else
        render json: {
                 error: 'Invalid email or password',
               },
               status: :unauthorized
      end
    else
      render json: { error: 'Invalid user type' }, status: :unprocessable_entity
    end
  end

  def destroy
    if params[:user_type] == 'owner'
      session[:owner_id] = nil
      render json: { message: 'Owner logged out successfully' }
    elsif params[:user_type] == 'user'
      session[:user_id] = nil
      render json: { message: 'User logged out successfully' }
    else
      render json: { error: 'Invalid user type' }, status: :unprocessable_entity
    end
  end
end
