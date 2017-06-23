// Launch Headless Chrome
// Find port of brunch config
// Open url on first slide
// Get max number of slides
// Take a screenshot
// go to next url
// take a screenshot
// until last slide
// merge slides into a pdf
const CDP = require('chrome-remote-interface');

// # #!/usr/bin/env ruby
// # require 'fileutils'
// #
// # # Create a pdf export of the talk
// # class Pdf
// #   def initialize
// #     @screenshots = File.expand_path('./screenshots')
// #     @brunch_config = File.expand_path('./brunch-config.js')
// #   end
// #
// #   def create_directories
// #     FileUtils.mkdir_p(@screenshots)
// #   end
// #
// #   # Return the port used in the brunch config
// #   def get_port
// #     raw_config = File.read(@brunch_config)
// #     raw_config.each_line.detect do |line|
// #       line = line.strip
// #       break line.split(': ')[1] if line =~ /^port/
// #       false
// #     end
// #   end
// #
// #   def get_width
// #
// #   end
// #
// #   def get_height
// #     
// #   end
// #
// #   def take_screenshot(slide_number)
// #     Dir.chdir(@screenshots)
// #
// #     url = "http://localhost:#{get_port}/#/#{slide_number}"
// #     output = "slide_#{slide_number.to_s.rjust(2, "0")}.png"
// #
// #     options = [
// #       '--headless',
// #       '--disable-gpu',
// #       '--screenshot',
// #       url
// #     ]
// #     command = "google-chrome #{options.join(' ')}"
// #     `#{command}`
// #
// #     FileUtils.mv('./screenshot.png', "./#{output}")
// #   end
// #
// #   def run
// #     p get_port
// #
// #     # create_directories
// #     #
// #     take_screenshot(10)
// #   end
// #
// #
// # end
// # Pdf.new.run
// #
// # # mkdir -p ./tmp
// # # mkdir -p ./screenshots
// # # cd ./tmp
// # #
// # # # Generate screenshots of every page
// # #
// # # cd 
// # #
// # #
