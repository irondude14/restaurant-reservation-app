class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  def show
    render json: @user, include: { reservations: :restaurant }
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
      :password,
      :phone,
      :password_confirmation,
    )
  end
end
