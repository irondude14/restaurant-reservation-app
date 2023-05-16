class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  def show
    render json: @user, include: { reservations: :restaurant }
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: {
               errors: user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created
    else
      render json: {
               errors: user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    render json: { message: 'User deleted' }, status: :no_content
  end

  private

  def set_user
    @user = User.includes(:reservations).find_by(id: params[:id])

    render json: { error: 'User not found' }, status: :not_found unless @user
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :phone,
      :password,
      :password_confirmation,
    )
  end
end
