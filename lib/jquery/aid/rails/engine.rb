module Jquery
  module Aid
    module Rails

      class Engine < ::Rails::Engine
        isolate_namespace Jquery::Aid::Rails

        config.before_initialize do
          # << faz push no array paths com uma string informada
          #Dir["./"].each { |p| Rails.application.config.assets.paths << p }
          # Se for o caso, usar: root.join("lib/assets/javascripts")
        end

        # verificar se é necessário
        # ActiveSupport.on_load(:action_view) do
        #   include IntranetCore::Helper
        # end

      end

    end
  end
end