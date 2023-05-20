class OwnersController < ApplicationController
  before_action :set_owner, only: %i[show]

  def show
    render json: @owner, include: :restaurants
  end

  def update
    owner = Owner.find_by(id: params[:id])
    if owner.update(owner_params)
      render json: owner
    else
      render json: {
               errors: owner.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def create
    owner = Owner.create(owner_params)

    if owner.valid?
      session[:owner_id] = owner.id
      render json: owner, status: :created
    else
      render json: {
               errors: owner.errors.full_messages,
             },
             status: :unprocessable_entity
    end
  end

  def destroy
    owner = Owner.find_by(id: params[:id])
    owner.destroy
    render json: { message: 'Owner deleted' }, status: :no_content
  end

  private

  def set_owner
    @owner = Owner.includes(:restaurants).find_by(id: session[:owner_id])

    render json: { error: 'Not Authorized' }, status: :not_found unless @owner
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
