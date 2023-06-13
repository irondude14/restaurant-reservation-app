class OwnershipsController < ApplicationController
  before_action :set_ownership, only: %i[show update destroy]
  before_action :authorize_ownership, only: %i[show update destroy]

  def index
    @ownerships = Ownership.all
    render json: @ownerships
  end

  def show
    render json: @ownership
  end

  def create
    @ownership = Ownership.new(ownership_params)

    if @ownership.save
      render json: @ownership, status: :created, location: @ownership
    else
      render json: @ownership.errors, status: :unprocessable_entity
    end
  end

  def update
    if @ownership.update(ownership_params)
      render json: @ownership
    else
      render json: @ownership.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @ownership.destroy
  end

  private

  def set_ownership
    @ownership = Ownership.find(params[:id])
  end

  def current_user
    user = User.find_by(id: session[:user_id])

    unless user
      render json: { error: 'User not found' }, status: :not_found
      return
    end

    user
  end

  def authorize_ownership
    return if @ownership.user == current_user

    render json: { error: 'Not Authorized' }, status: :unauthorized
  end

  def ownership_params
    params.require(:ownership).permit(:user_id, :restaurant_id)
  end
end
