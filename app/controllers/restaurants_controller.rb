class RestaurantsController < ApplicationController
  before_action :set_restaurant, only: %i[show update destroy]
  before_action :authorize_restaurant_ownership, only: %i[update destroy]

  def index
    restaurants = Restaurant.all
    render json: restaurants
  end

  def show
    render json: @restaurant
  end

  def create
    restaurant = Restaurant.create(restaurant_params)
    if restaurant.valid?
      render json: restaurant, status: :created
    else
      render json: {
               errors: restaurant.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def update
    if @restaurant.update(restaurant_params)
      render json: @restaurant
    else
      render json: {
               errors: @restaurant.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @restaurant.destroy
    render json: { message: 'Restaurant deleted' }, status: :no_content
  end

  private

  def set_restaurant
    @restaurant = Restaurant.find_by(id: params[:id])
    unless @restaurant
      render json: { error: 'Restaurant not found' }, status: :not_found
    end
  end

  def authorize_restaurant_ownership
    return if @restaurant.owners.include?(current_user)

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
