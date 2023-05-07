class OwnersController < ApplicationController
  before_action :set_owner, only: %i[show update destroy]

  def show
    render json: @owner
  end

  def update
    if @owner.update(owner_params)
      render json: @owner
    else
      render json: {
               errors: owner.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def create
    @owner = Owner.new(owner_params)
    if @owner.save
      render json: @owner, status: :created
    else
      render json: {
               errors: owner.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    @owner.destroy
    render json: { message: 'Owner deleted' }, status: :no_content
  end

  private

  def set_owner
    @owner = Owner.find_by(id: params[:id])

    render json: { error: 'Owner not found' }, status: :not_found unless @owner
  end

  def owner_params
    params.require(:owner).permit(
      :name,
      :email,
      :password,
      :password_confirmation,
    )
  end
end