feature 'home route', type: :feature do

  feature 'it shows the temperature on the home screen' do

    scenario 'the default temperature is 20 ' do
      visit '/'
      expect(page).to have_content 'degrees'
    end
  end

  feature 'users can changes the temperature' do
    scenario 'users can increase the temperature' do
      visit '/'
      expect(page).to have_button '+'
    end

    scenario 'users can descrease the temperature' do
      visit '/'
      expect(page).to have_button '-'
    end

    scenario 'users can reset the termperature to 20' do
      visit '/'
      expect(page).to have_button 'reset'
    end
  end
end
