class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: %i[show update destroy]
  before_action :authorize_restaurant_ownership, only: %i[update destroy]

  def index
    restaurants = Restaurant.all
    render json: restaurants
  end

  def show
    render json: @restaurant, include: :owners
  end

  def create
    restaurant = Restaurant.create(restaurant_params)
    if restaurant.valid?
      Ownership.create(user_id: session[:user_id], restaurant_id: restaurant.id)
      render json: restaurant, status: :created
    else
      render json: {
               errors: restaurant.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def update
    user = User.find_by(id: session[:user_id])
    if user.owned_restaurants.include?(@restaurant)
      if @restaurant.update(restaurant_params)
        render json: @restaurant
      else
        render json: {
                 errors: @restaurant.errors.full_messages,
               },
               status: :unprocessable_entity
      end
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    if user.owned_restaurants.include?(@restaurant)
      Ownership.find_by(
        user_id: user.id,
        restaurant_id: @restaurant.id,
      )&.destroy
      @restaurant.destroy
      render json: { message: 'Restaurant deleted' }, status: :no_content
    else
      render json: { error: 'Not Authorized' }, status: :unauthorized
    end
  end

  private

  # def current_user
  # user = User.find_by(id: session[:user_id])
  #   unless user
  #     render json: { error: 'User not found' }, status: :not_found
  #     return
  #   end

  #   user
  # end

  def set_restaurant
    @restaurant = Restaurant.find_by(id: params[:id])
    unless @restaurant
      render json: { error: 'Restaurant not found' }, status: :not_found
    end
  end

  def authorize_restaurant_ownership
    user = User.find_by(id: session[:user_id])
    return if user.owned_restaurants.include?(@restaurant)

    render json: { error: 'Not Authorized' }, status: :unauthorized
  end

  def restaurant_params
    params.require(:restaurant).permit(
      :name,
      :address,
      :phone,
      :price,
      :image_url,
      :description,
    )
  end
end
