# barcode_utils.py

import os
from barcode import Code128
from barcode.writer import ImageWriter
from io import BytesIO
from PIL import Image

def generate_barcode(barcode_number: str, output_dir: str = "barcodes") -> str:
    """
    Generates a barcode image from the provided barcode number.

    Args:
        barcode_number (str): The number to encode in the barcode.
        output_dir (str): Directory where the barcode image will be saved.

    Returns:
        str: The file path to the generated barcode image.
    """
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Create a barcode writer with ImageWriter to generate image files
    barcode_class = Code128
    writer = ImageWriter()

    # Generate the barcode
    barcode = barcode_class(barcode_number, writer=writer)

    # Set the output file path
    file_path = os.path.join(output_dir, f"{barcode_number}.png")

    # Save the barcode image
    barcode.save(file_path)

    return file_path

def get_barcode_image(barcode_number: str) -> BytesIO:
    """
    Generates a barcode image and returns it as an in-memory file.

    Args:
        barcode_number (str): The number to encode in the barcode.

    Returns:
        BytesIO: In-memory binary stream of the barcode image.
    """
    barcode_class = Code128
    writer = ImageWriter()

    # Create an in-memory bytes buffer
    buffer = BytesIO()

    # Generate the barcode and write it to the buffer
    barcode = barcode_class(barcode_number, writer=writer)
    barcode.write(buffer)

    # Reset the buffer's position to the beginning
    buffer.seek(0)

    return buffer

def save_barcode_image(barcode_number: str, output_dir: str = "barcodes") -> None:
    """
    Generates a barcode image and saves it to the specified directory.

    Args:
        barcode_number (str): The number to encode in the barcode.
        output_dir (str): Directory where the barcode image will be saved.
    """
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Get the barcode image as a BytesIO object
    buffer = get_barcode_image(barcode_number)

    # Open the image using PIL and save it
    image = Image.open(buffer)
    file_path = os.path.join(output_dir, f"{barcode_number}.png")
    image.save(file_path, format='PNG')

def barcode_exists(barcode_number: str, output_dir: str = "barcodes") -> bool:
    """
    Checks if a barcode image already exists in the output directory.

    Args:
        barcode_number (str): The barcode number to check.
        output_dir (str): Directory where barcode images are stored.

    Returns:
        bool: True if the barcode image exists, False otherwise.
    """
    file_path = os.path.join(output_dir, f"{barcode_number}.png")
    return os.path.exists(file_path)