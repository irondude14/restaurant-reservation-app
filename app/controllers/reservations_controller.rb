class ReservationsController < ApplicationController
  before_action :authorize

  def index
    reservations = current_user.reservations
    render json: reservations
  end

  def update
    reservation = current_user.reservations.find(params[:id])
    if reservation.update(reservation_params)
      render json: reservation
    else
      render json: {
               errors: reservation.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def create
    reservation = current_user.reservations.create(reservation_params)
    if reservation.valid?
      render json: reservation, status: :created
    else
      render json: {
               errors: reservation.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    reservation = current_user.reservations.find(params[:id])
    reservation.destroy
    render json: { message: 'Reservation deleted successfully' }
  end

  private

  def current_user
    user = User.find_by(id: session[:user_id])

    unless user
      render json: { error: 'User not found' }, status: :not_found
      return
    end

    user
  end

  def authorize
    unless session.include? :user_id
      return render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  def reservation_params
    params.require(:reservation).permit(
      :restaurant_id,
      :name,
      :date_time,
      :guest_number,
    )
  end
end
