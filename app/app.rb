require 'sinatra/base'
require 'json'

class ThermostatApp < Sinatra::Base

  set :public_folder, 'public'
  enable :sessions

  get '/' do
    erb(:index)
  end

  get '/temperature' do
    {
      temperature: session[:temp] || 20,
      psm: session[:psm] || "true"
    }.to_json;
  end

  post '/temperature' do
    session[:temp] = params[:temp].to_s
    session[:psm] = params[:psm]
    p session[:psm]
  end

end
