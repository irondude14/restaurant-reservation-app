class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]

  def show
    render json: @user,
           include: {
             reservations: :restaurant,
             owned_restaurants: {
             },
           }
  end

  def update
    if @user.update(user_update_params)
      render json: @user
    else
      render json: {
               errors: @user.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def create
    user = User.create(user_params)

    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
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
    @user =
      User.includes(:reservations, owned_restaurants: :ownerships).find_by(
        id: session[:user_id],
      )

    render json: { error: 'Not Authorized' }, status: :not_found unless @user
  end

  def user_params
    params.require(:user).permit(
      :name,
      :email,
      :password,
      :password_confirmation,
    )
  end

  def user_update_params
    params.require(:user).permit(:name, :email)
  end
end
