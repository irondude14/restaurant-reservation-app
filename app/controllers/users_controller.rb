class UsersController < ApplicationController
  before_action :current_user, only: %i[show update destroy]

  def show
    render json: current_user
  end

  def update
    if current_user.update(user_update_params)
      render json: current_user
    else
      render json: {
        errors: current_user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def create
    user = User.create(user_params)

    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: {
        errors: user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def destroy
    current_user.destroy
    render json: { message: 'User deleted' }, status: :no_content
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation
    )
  end

  def user_update_params
    params.require(:user).permit(:name, :email)
  end
end
