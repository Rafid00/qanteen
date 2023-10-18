import os
import subprocess
import time

def run_command_in_new_terminal(command, path):
    subprocess.Popen(f'start cmd /K "cd /d {path} && {command}"', shell=True)

if __name__ == "__main__":
    current_directory = os.getcwd()
    client_directory = os.path.join(current_directory, 'client')
    server_directory = os.path.join(current_directory, 'server')

    commands = [
        ("npm run start", client_directory),
        ("npx nodemon", server_directory),
        ("python recommendation.py", server_directory)
    ]

    for command, path in commands:
        run_command_in_new_terminal(command, path)

    # Adjust this delay to allow the terminals to open before the script ends
    time.sleep(2)
