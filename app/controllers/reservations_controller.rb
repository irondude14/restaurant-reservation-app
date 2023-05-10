class ReservationsController < ApplicationController
  before_action :set_reservation, only: %i[show update destroy]

  def index
    reservation = Reservation.all
    render json: reservation
  end

  def update
    if @reservation.update(reservation_params)
      render json: @reservation
    else
      render json: {
               errors: reservation.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def create
    @reservation = Reservation.create(reservation_params)
    if @reservation.persisted?
      render json: @reservation, status: :created
    else
      render json: {
               errors: reservation.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @reservation.destroy
    render json: { message: 'Reservation deleted' }, status: :no_content
  end

  private

  def set_reservation
    @reservation = Reservation.find_by(id: params[:id])

    unless @reservation
      render json: { error: 'Reservation not found' }, status: :not_found
    end
  end

  def reservation_params
    params.require(:reservation).permit(:name, :date_time, :guest_number)
  end
end
