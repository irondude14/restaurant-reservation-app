class ApplicationController < ActionController::API
  include ActionController::Cookies

  #   def current_user
  #   user = User.find_by(id: session[:user_id])

  #   unless user
  #     render json: { error: 'User not found' }, status: :not_found
  #     return
  #   end

  #   user
  # end
end
