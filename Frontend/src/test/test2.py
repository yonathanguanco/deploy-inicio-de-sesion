from selenium import webdriver 
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.common.exceptions import TimeoutException
import time

# Configura la ruta a tu chromedriver si es necesario
service = Service()  # Cambia esta ruta si hace falta
driver = webdriver.Chrome(service=service)

# Aumentamos el timeout para WebDriverWait también a 20 segundos
wait = WebDriverWait(driver, 20)

try:
    # ---------- REGISTRO ----------
    driver.get("http://localhost:3000/")  # URL donde está el formulario de registro

    # Espera y encuentra el campo nombre
    nombre_input = wait.until(EC.presence_of_element_located((By.NAME, "nombre")))
    print("Campo nombre encontrado para registro")

    # Completa los campos
    nombre_input.send_keys("juanito")
    correo_input = driver.find_element(By.NAME, "correo")
    correo_input.send_keys("juanito@gmail.com")
    contraseña_input = driver.find_element(By.NAME, "contraseña")
    contraseña_input.send_keys("1234567")

    # Espera que el botón de submit esté clickable y haz click
    submit_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
    submit_button.click()

    # Espera más larga para que el proceso termine y/o redirección
    time.sleep(10)  
    print("Formulario de registro enviado correctamente")

    # ---------- LOGIN ----------
    driver.get("http://localhost:3000/login")  # URL del formulario de login

    # Espera a que aparezca el input correo
    correo_login_input = wait.until(EC.presence_of_element_located((By.NAME, "correo")))
    print("Campo correo encontrado para login")

    # Completa los campos de login
    correo_login_input.send_keys("pepe@gmail.com")
    contraseña_login_input = driver.find_element(By.NAME, "contrasena")
    contraseña_login_input.send_keys("123456")

    # Espera que el botón submit sea clickeable y haz click
    submit_login_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
    submit_login_button.click()

    # Espera más larga para que el login procese
    time.sleep(8)
    print("Login enviado correctamente")

except TimeoutException:
    print("❌ No se pudo encontrar algún elemento necesario para el proceso")

except Exception as e:
    print(f"❌ Error en el flujo de prueba: {e}")

finally:
    driver.quit()
