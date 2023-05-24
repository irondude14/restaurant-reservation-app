class OwnershipsController < ApplicationController
  before_action :set_ownership, only: [:show, :update, :destroy]

  # GET /ownerships
  def index
    @ownerships = Ownership.all

    render json: @ownerships
  end

  # GET /ownerships/1
  def show
    render json: @ownership
  end

  # POST /ownerships
  def create
    @ownership = Ownership.new(ownership_params)

    if @ownership.save
      render json: @ownership, status: :created, location: @ownership
    else
      render json: @ownership.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /ownerships/1
  def update
    if @ownership.update(ownership_params)
      render json: @ownership
    else
      render json: @ownership.errors, status: :unprocessable_entity
    end
  end

  # DELETE /ownerships/1
  def destroy
    @ownership.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_ownership
      @ownership = Ownership.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def ownership_params
      params.require(:ownership).permit(:user_id, :restaurant_id)
    end
end
