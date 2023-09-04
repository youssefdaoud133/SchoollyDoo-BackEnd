import sys

# Add the directory containing Pillow to the Python path
sys.path.append('../../../../../opt/render/.local/lib/python3.7/site-packages')


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

# Parse the JSON data
data = json.loads(data_argument)





# Determine the script's directory to create relative file paths
script_dir = os.path.dirname(os.path.realpath(__file__))

# Input image path (relative to script directory)
image_path = os.path.join(script_dir, "gdwl-step5.jpg")
# Input image path
# image_path = "G:/SchoollyDoo/backend/nodejs-schoolly-api-v1/utils/gdwl-step5.jpg"

# Arabic text to add
arabic_text = schoolname



# Font settings (using a font that supports Arabic)
font_path = "arial"  # Path to an Arabic TrueType font file
if int(fontsize) > 0:
    font_size = int(fontsize)
else:
    font_size = 66
font_color = (255, 255, 255)  # RGB color tuple (white)

# Load the image
image = Image.open(image_path)

# Create a drawing context
draw = ImageDraw.Draw(image)

# Load the Arabic font
font = ImageFont.truetype(font_path, font_size)

# Position to place the text
text_position = (936.46, 200.95)




# Starting position (x and y coordinates)
start_x = 250.44
start_y = 800.65

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
mstart_x = 250.4
mstart_y = 610.65

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



