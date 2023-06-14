class ApplicationController < ActionController::API
  include ActionController::Cookies

  # before_action :current_user, unless: :skip_authorization?

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  # def skip_authorization?
  #   controller_name == 'restaurants' && action_name == 'index'||
  #   controller_name == 'users' && action_name == 'create'
  # end
  
end
