#!/usr/bin/env python3.7


import sys



from PIL import Image, ImageDraw, ImageFont
# import pyglet
import base64

import arabic_reshaper
import io
import sys
import json
import os  # Import the os module for file path operations

from bidi.algorithm import get_display
# solve arabicproblem
def solve_arabic(arabic_text):
   reshaped = arabic_reshaper.reshape(arabic_text)
   return get_display(reshaped)


# Get the data from command-line arguments
data_argument = sys.argv[1]
schoolname = sys.argv[2]
fontsize = sys.argv[3]
ToRight = sys.argv[4]
ToDown = sys.argv[5]
theme = sys.argv[6]


# Parse the JSON data
data = json.loads(data_argument)





# Determine the script's directory to create relative file paths
script_dir = os.path.dirname(os.path.realpath(__file__))

# Input image path (relative to script directory)
image_path_orange = os.path.join(script_dir, "gdwl-step5.jpg")
image_path_blue = os.path.join(script_dir, "them_blue.jpg")
image_path_purple = os.path.join(script_dir, "them_purple.jpg")
fontpth = os.path.join(script_dir, "Raleway-Light.ttf")
# Input image path
# image_path = "G:/SchoollyDoo/backend/nodejs-schoolly-api-v1/utils/gdwl-step5.jpg"

# Arabic text to add
arabic_text = schoolname



# Font settings (using a font that supports Arabic)
font_path = "arial"  # Path to an Arabic TrueType font file
font_size = 66  + int(fontsize)

font_color = (255, 255, 255)  # RGB color tuple (white)

image = None  # Initialize the image variable to None

if theme == "orange":
    image = Image.open(image_path_orange)
elif theme == "blue":
    image = Image.open(image_path_blue)
elif theme == "purple":
    image = Image.open(image_path_purple)

# Create a drawing context
draw = ImageDraw.Draw(image)

# Load the Arabic font
font = ImageFont.truetype(fontpth, font_size)

# Position to place the text
text_position = (936.46, 160.95)




# Starting position (x and y coordinates)
start_x = 250.44  + int(ToRight)
start_y = 800.65 + int(ToDown)

# Cell size (width and height)
cell_width = 310  # Adjust as needed
cell_height = 240  # Adjust as needed

# Iterate through your data and print it onto the image
for row in data:
    x = start_x
    y = start_y

    for key, value in row.items():
        text = f"{value}"
        draw.text((x, y), solve_arabic(text), font=font, fill=font_color)
        x += cell_width  # Move to the next column

    start_y += cell_height  # Move to the next row

# mainrow    
# Starting position (x and y coordinates)
mstart_x = 250.4 + int(ToRight) 
mstart_y = 610.65 + int(ToDown)

# Cell size (width and height)
mcell_width = 310  # Adjust as needed
mcell_height = 240  # Adjust as needed

# Iterate through your data and print it onto the image
for row in data:
    x = mstart_x
    y = mstart_y

    for key, value in row.items():
        text = f"{key}"
        draw.text((x, y), solve_arabic(text), font=font, fill=font_color)
        x += mcell_width  # Move to the next column

    start_y += mcell_height  # Move to the next row





# Load the Arabic font
font = ImageFont.truetype(fontpth, 130)



# Add Arabic text to the image
draw.text(text_position,solve_arabic(arabic_text), font=font, fill=font_color)

# # Save the modified image
# image.save("G:/SchoollyDoo/backend/nodejs-schoolly-api-v1/utils/dist/output.jpg")

# Create a BytesIO object to save the image in memory
output_buffer = io.BytesIO()

# Save the image to the BytesIO object
image.save(output_buffer, format="JPEG")

# Convert the BytesIO object to bytes
image_bytes = output_buffer.getvalue()

base64_string = base64.b64encode(image_bytes).decode('utf-8')

print(base64_string)

# Close the BytesIO object
output_buffer.close()



